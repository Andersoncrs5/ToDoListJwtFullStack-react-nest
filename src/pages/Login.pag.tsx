// import React from "react";
import { useEffect, useState } from 'react';
import '../Styles/Login.css';
import BtnsBackSubmit from "../components/btnsBackSubmit.component";
import LoginDto from '../DTOs/login.dto';
import api from '../axios/api';
import { AxiosResponse } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import SpinnerLoad from '../components/SpinnerLoad.component';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const nav: NavigateFunction = useNavigate();
    const spinner: HTMLElement | null = document.getElementById("spinnerDiv");

    useEffect(() => {
        checkToken();
    }, []);

    function checkToken() {
        const token = localStorage.getItem("token");
        if (token) {
            nav('/task/my-tasks');
        }
    }

    async function clearInput(){
        setEmail('');
        setPassword('');
    }

    async function DivSpinnerTurnNone() {
        if (!spinner) {
            console.error('Div spinner not found');
            return;
        }

        spinner.style.display = 'none';
    }

    async function HandleSubmit(e: React.FormEvent) {
        try {
            e.preventDefault();

            if (!spinner) {
                console.error('Div spinner not found');
                return;
            }

            spinner.style.display = 'block';

            const user: LoginDto = {
                email,
                password
            }

            const res: AxiosResponse<any, any> = await api.post('/auth/login', user);

            if (res.status == 500){
                console.error(res.data)
                DivSpinnerTurnNone()
                alert('Error internal in server. please try again later!');
            }

            if (res.status == 401){
                DivSpinnerTurnNone()
                alert('Datas invalids');
            }

            if (res.status == 200) {
                DivSpinnerTurnNone()
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("refreshToken", res.data.refresh_token);
                await clearInput();
                nav('/task/my-tasks');
            }

            DivSpinnerTurnNone()
        } catch (e) {
            console.error(e);
            DivSpinnerTurnNone()
            alert('Error the make login try again later');
        }
    }

    function messageValidInSmall(small: string, message: string) {
        const input: HTMLElement | null = document.getElementById(small);

        if (!small || !message) {
            console.error('Error the pass the name tag small or the message')
            return;
        }

        if (input == null) {
            console.error('Error the get tag small of' + small);
            return;
        }

        input.style.display = 'block';
        input.innerHTML = message;

        setTimeout(() => {
            input.style.display = 'none';
        }, 8000);
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
                            <div id="spinnerDiv" style={{ display: 'none' }} >
                                <SpinnerLoad />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>  
    );
}
