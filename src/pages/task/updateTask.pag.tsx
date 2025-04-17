import { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import api from "../../axios/api";
import { useEffect, useRef, useState } from "react";
import TaskEntity from "../../DTOs/tasks/taskEntity.dto";
import BtnSubmitForm from "../../components/btnSubmitForm.component";
import BtnBackMain from "../../components/BtnBackMain.component";
import UpdateTaskDto from "../../DTOs/tasks/updateTask.dto";
import SuccessAlert from "../../alerts/SuccessAlert.alert";

export default function UpdateTask() {
    const [task, setTask] = useState<TaskEntity>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { id } = useParams();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const nav: NavigateFunction = useNavigate();
    const alertRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getTask();
    }, []);

    function NavToMyTask() {
        nav('/task/my-tasks');
    }

    async function ShowAlertSuccess() {
        if (!alertRef.current) return;
        alertRef.current.style.display = 'block';

        setTimeout(() => {
            if (alertRef.current) alertRef.current.style.display = 'none';
        }, 6000);
    }

    async function getTask() {
        try {
            const res: AxiosResponse<any, any> = await api.get('/task/' + id);

            if (res.status === 200) {
                const data = res.data;
                setTask(data);
                setTitle(data.title);
                setDescription(data.description);
            } else if (res.status === 404) {
                NavToMyTask();
            } else if (res.status === 500) {
                console.error(res.data);
                NavToMyTask();
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            NavToMyTask();
        }
    }

    async function HandleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const updatedTask: UpdateTaskDto = {
            title,
            description
        };

        try {
            const res: AxiosResponse<any, any> = await api.put('/task/' + id, updatedTask);

            if (res.status === 200) {
                setSuccessMessage("Task updated successfully!");
                await ShowAlertSuccess();
                NavToMyTask();
            } else if (res.status === 404) {
                console.error(res.data);
                NavToMyTask();
            } else if (res.status === 500) {
                console.error(res.data);
                alert('Error updating the task');
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert('Error updating the task');
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-5 rounded-2 border border-1 shadow">
                <div style={{ display: 'none' }} id="DivSuccessAlert" ref={alertRef}>
                    <SuccessAlert message={successMessage} />
                </div>
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
                                <BtnSubmitForm />
                                <BtnBackMain />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}