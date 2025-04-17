import { useEffect, useRef, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import '../Styles/Login.css'

import BtnsBackSubmit from "../components/btnsBackSubmit.component";
import LoginDto from '../DTOs/user/login.dto';
import api from '../axios/api';
import axios, { AxiosResponse } from 'axios';

import SpinnerLoad from '../components/SpinnerLoad.component';
import ErrorForm from './HandleErrorForm/ErrorForm.handle';
import ErrorAlert from '../alerts/ErrorAlert.alert';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorInput, setErrorInput] = useState<string[]>([]);
    const [msg, setMsg] = useState<string>('');

    const nav: NavigateFunction = useNavigate();
    const spinnerRef = useRef<HTMLDivElement>(null);
    const errorDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            nav('/task/my-tasks');
        }
    }, [nav]);

    const clearInput = () => {
        setEmail('');
        setPassword('');
    };

    const DivSpinnerTurnNone = () => {
        if (spinnerRef.current) {
            spinnerRef.current.style.display = 'none';
        }
    };

    async function HandleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorInput([]);

        if (!spinnerRef.current) {
            console.error('Div spinner not found');
            return;
        }

        spinnerRef.current.style.display = 'block';

        const user: LoginDto = { email, password };

        try {
            const res: AxiosResponse<any, any> = await api.post('/auth/login', user);

            if (res.status === 200) {
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("refreshToken", res.data.refresh_token);
                clearInput();
                nav('/task/my-tasks');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setMsg('Dados inválidos');
                    if (errorDivRef.current) {
                        errorDivRef.current.style.display = 'block';
                        setTimeout(() => {
                            if (errorDivRef.current) {
                                errorDivRef.current.style.display = 'none';
                            }
                        }, 4000);
                    }
                } else {
                    const mensagens = error.response?.data?.message;
                    if (Array.isArray(mensagens)) {
                        setErrorInput(mensagens);
                    } else {
                        console.log("Erro:", mensagens || error.message);
                    }
                }
            } else {
                console.log("Erro inesperado:", error);
            }
        }

        DivSpinnerTurnNone();
    }

    return (
        <main>
            {errorInput.length > 0 && <ErrorForm message={errorInput} />}
            <div ref={errorDivRef} style={{ display: 'none' }}>
                <ErrorAlert message={msg} />
            </div>

            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-5 rounded-2 border border-1 shadow">
                    <form onSubmit={HandleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="email">Email:</label>
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorInput([]);
                                    }}
                                    value={email}
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                />
                            </div>
                            <div className="col-12 mt-1">
                                <label htmlFor="password">Senha:</label>
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorInput([]);
                                    }}
                                    value={password}
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password"
                                />
                            </div>
                            <div className="col-12">
                                <BtnsBackSubmit />
                            </div>
                            <div ref={spinnerRef} style={{ display: 'none' }}>
                                <SpinnerLoad />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}