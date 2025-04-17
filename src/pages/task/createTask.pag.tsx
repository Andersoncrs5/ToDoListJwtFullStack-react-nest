import React, { useEffect, useRef, useState } from 'react';
import '../../Styles/Tasks/CreateTask.css';
import BtnSubmitForm from '../../components/btnSubmitForm.component';
import BtnBackMain from '../../components/BtnBackMain.component';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../axios/api';
import CreateTaskDto from '../../DTOs/tasks/createTask.dto';
import SuccessAlert from '../../alerts/SuccessAlert.alert';
import ErrorForm from '../HandleErrorForm/ErrorForm.handle';
import axios from 'axios';

export default function CreateTask() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorInput, setErrorInput] = useState<string[]>([]);

    const successDivRef = useRef<HTMLDivElement>(null);
    const errorDivRef = useRef<HTMLDivElement>(null);
    const nav = useNavigate();

    useEffect(() => {
        checkToken();
        ClearInputs();
    }, []);

    function NavMyTasks() {
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

    function ShowAlertSuccess() {
        if (successDivRef.current) {
            successDivRef.current.style.display = 'block';
        }
    }

    async function HandleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        setErrorInput([]);

        const task: CreateTaskDto = {
            title,
            description,
        }

        try {
            const res: AxiosResponse<any, any> = await api.post('/task', task);

            if (res.status === 200) {
                setSuccessMessage("Task created successfully!");
                ShowAlertSuccess();
                ClearInputs();
                setTimeout(() => { NavMyTasks(); }, 3000);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    alert("You are not authorized!");
                    ClearInputs();
                    NavMyTasks();
                } else if (error.response?.status === 404) {
                    NavMyTasks();
                } else {
                    const mensagens = error.response?.data?.message;
                    if (Array.isArray(mensagens)) {
                        setErrorInput(mensagens);
                    } else {
                        console.error("Erro:", mensagens || error.message);
                    }
                }
            } else {
                console.error("Erro inesperado:", error);
            }
        }
    }

    return (
        <main>
            {errorInput.length > 0 && <ErrorForm message={errorInput} />}
            <div ref={successDivRef} style={{ display: 'none' }}>
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