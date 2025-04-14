// import React from "react";
import { useState } from 'react';
import '../Styles/Login.css';
import BtnsBackSubmit from "../components/btnsBackSubmit.component";
import LoginDto from '../DTOs/login.dto';
import api from '../axios/api';
import { AxiosResponse } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const nav: NavigateFunction = useNavigate();

    async function clearInput(){
        setEmail('');
        setPassword('');
    }

    async function HandleSubmit(e: React.FormEvent) {
        try {
            e.preventDefault();

            const user: LoginDto = {
                email,
                password
            }

            const res: AxiosResponse<any, any> = await api.post('/auth/login', user);

            if (res.status == 500){
                console.error(res.data)
                alert('Error internal in server. please try again later!');
            }

            if (res.status == 401){
                alert('Datas invalids');
            }

            if (res.status == 200) {
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("refreshToken", res.data.refresh_token);
                await clearInput();
                nav('/main');
            }

        } catch (e) {
            console.error(e);
            alert('Error the make login try again later');
        }
    }

    return (
        <main>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-5 rounded-2 border border-1 shadow">
                    <form onSubmit={HandleSubmit} >
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="email">Email:</label>
                                <input onChange={(e) => { setEmail(e.target.value) } } type="email" name="email" className="form-control"  id="email" required max={150} min={1}  />
                            </div>
                            <div className="col-12 mt-1 ">
                                <label htmlFor="password">Password:</label>
                                <input onChange={(e) => { setPassword(e.target.value) } } type="password" name="password" className="form-control  "  id="password" required max={50} min={6}  />
                            </div>
                            <div className="col-12">
                                <BtnsBackSubmit />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>  
    );
}
