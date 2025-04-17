import React, { useEffect, useState } from 'react';
import '../../Styles/Tasks/CreateTask.css';
import BtnSubmitForm from '../../components/btnSubmitForm.component';
import BtnBackMain from '../../components/BtnBackMain.component';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../axios/api';
import CreateTaskDto from '../../DTOs/tasks/createTask.dto';
import SuccessAlert from '../../alerts/SuccessAlert.alert';

export default function CreateTask() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>("");
    const DivSuccessAlert: HTMLElement | null = document.getElementById("DivSuccessAlert");
    const nav = useNavigate()

    useEffect(() => {
        checkToken();
        ClearInputs();
    }, []);

    function NavMyTasks(){
        nav('/task/my-tasks');
    }

    function ClearInputs() {
        setTitle('');
        setDescription('');
    }

    function checkToken(): void {
        const token: string | null = localStorage.getItem("token");
        if (!token) {
            nav('/home');
        }
    }

    async function ShowAlertSuccess(){
        if (!DivSuccessAlert) {
            return;
        }
        
        DivSuccessAlert.style.display = 'block';
    }

    async function HandleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        try {
            const task: CreateTaskDto = {
                title,
                description,
            }

            const res: AxiosResponse<any, any> = await api.post('/task', task);
        
            if (res.status == 500) {
                console.error(res.data);
                alert("Error in server! Please try again later");
                return;
            }

            if (res.status == 401) {
                alert("You are not authorized!");
                ClearInputs()
                NavMyTasks();
            }

            if (res.status == 404) {
                NavMyTasks();
            }

            if (res.status == 200) {
                setSuccessMessage("Task created successfully!");
                await ShowAlertSuccess()
                ClearInputs();
                setTimeout(()=> {NavMyTasks();}, 3000)   
            }

        } catch (e) {
            console.error(e);

        }
    }

    return (
        <main>
            <div style={{ display: 'none' }} id="DivSuccessAlert" >
                <SuccessAlert message={successMessage} /> 
            </div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-5 rounded-2 border border-1 shadow">
                    <form onSubmit={HandleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="title">Title</label>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="title"
                                />
                            </div>

                            <div className="col-12 mt-1">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    className="form-control"
                                    name="description"
                                    id="description"
                                />
                            </div>

                            <div className="col-12">
                                <div className="mt-1 d-flex justify-content-between">
                                    <div>
                                        <BtnSubmitForm />
                                    </div>
                                    <div>
                                        <BtnBackMain />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>  
    );
}