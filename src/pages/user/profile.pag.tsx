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

    async function DeleteAccount(){
        const res: AxiosResponse<any, any> = await api.delete('/user');

        if (res.status == 200) {
            localStorage.clear();
            setTimeout(() => {
                alert('Account deleted with success!');
            }, 3000);
            nav('/home');
        }

        if (res.status == 500) {
            
            setTimeout(() => {
                alert('Error the delete user');
            }, 3000);
        }

    }

    async function GoToUpdatePag(){
        nav('/user/update');
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
                <h3>email {user?.email}</h3>
                <h3>name: {user?.name} </h3>
                <div>
                    <button onClick={() => GoToUpdatePag() } className="btn btn-outline-success">UPDATE</button>
                    <button type="button" className="btn btn-outline-danger ms-1 me-1 " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i className="fa-regular fa-trash"/>
                    </button>

                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content bg-secondary">
                        <div className="modal-header text-center">
                            <h1 className="modal-title fs-5 text-danger " id="staticBackdropLabel">DELETE ACCOUNT</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            Do you really want to delete your account?
                        </div>
                        <div className="modal-footer justify-content-between ">
                            <button type="button" className="btn btn-close me-2" data-bs-dismiss="modal"></button>
                            <button onClick={() => DeleteAccount() } type="button" className="btn btn-success">Yes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <BtnBackMain />
                </div>
            </div>
        </div>
    );
}