import { useEffect, useState } from "react";
import UserEntity from "../../DTOs/user/user.entity";
import api from "../../axios/api";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import BtnBackMain from "../../components/BtnBackMain.component";

export default function Profile() {
    const [user, setUser] = useState<UserEntity>();
    const nav = useNavigate();

    useEffect(() => {
        chekToken()
        getUser()
    },[])

    async function getUser() {
        const res: AxiosResponse<any, any> = await api.get<UserEntity>('/user');
        console.log(res.data)

        if (res.status == 200) {
            setUser(res.data);
        }

        if (res.status == 404) {
            nav('/task/my-task');
        }

    }

    async function chekToken() {
        const token: string | null = localStorage.getItem("token");
        if (!token) {
            nav('/home');
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-5 rounded-2 border border-1 shadow text-white">
                <h3> email {user?.email}</h3>
                <h3>name: {user?.name} </h3>
                <div>
                    <button className="btn btn-outline-success">UPDATE</button>
                    <button className="btn btn-outline-danger ms-2 me-2">DELETE</button>
                    <BtnBackMain />
                </div>
            </div>
        </div>
    );
}