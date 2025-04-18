import { useEffect, useState } from 'react';
import '../Styles/Register.css';
import BtnsBackSubmit from "../components/btnsBackSubmit.component";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { AxiosResponse } from 'axios';
import RegisterDto from '../DTOs/user/register.dto';
import SpinnerLoad from '../components/SpinnerLoad.component';

export default function Register() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const nav: NavigateFunction = useNavigate();
    const spinner: HTMLElement | null = document.getElementById("spinnerDiv");

    useEffect(() => {
        checkToken();
    }, []);

    async function DivSpinnerTurnNone() {
        if (!spinner) {
            console.error('Div spinner not found');
            return;
        }

        spinner.style.display = 'none';
    }

    function checkToken() {
        const token = localStorage.getItem("token");
        if (token) {
            nav('/task/my-task');
        }
    }

    async function clearInput() {
        setEmail('');
        setName('');
        setPassword('');
    }

    function borderRedInput(nameInput: string) {
        const input: HTMLElement | null = document.getElementById(nameInput);
    
        if (input == null) {
            return;
        }
    
        input.style.borderColor = 'red';
    
        setTimeout(() => {
            input.style.borderColor = 'white';
        }, 10000);
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

    async function HandleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(!spinner) {
            return;
        }

        spinner.style.display = 'block';

        const user: RegisterDto = {
            name,
            email,
            password
        }

        const res: AxiosResponse<any, any> = await api.post('/auth/register', user);

        if (res.status == 500) {
            DivSpinnerTurnNone()
            console.error(res.data);
            alert('Error in server the make register');
        }

        if (res.status == 409) {
            DivSpinnerTurnNone()
            alert(res.data);
            borderRedInput('email');
        }

        if (res.status == 200) {
            DivSpinnerTurnNone()
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
            await clearInput();
            nav('/task/my-tasks');
        }

        DivSpinnerTurnNone()        
    }

    return (
        <main>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-5 rounded-2 border border-1 shadow">
                    <form onSubmit={HandleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="name">Name:</label>
                                <input onChange={(e) => setName(e.target.value) } type="text" name="name" className="form-control"  id="name" />
                                <small className='none' id="smallNameInput" ></small>
                            </div>
                            <div className="col-12">
                                <label htmlFor="email">Email:</label>
                                <input onChange={(e) => { setEmail(e.target.value) } } type="email" name="email" className="form-control"  id="email" required max={150} min={1}  />
                                <small className='none' id="smallEmailInput" ></small>
                            </div>
                            <div className="col-12 mt-1 ">
                                <label htmlFor="password">Password:</label>
                                <input onChange={(e) => { setPassword(e.target.value) } } type="password" name="password" className="form-control  "  id="password" required max={50} min={6}  />
                                <small className='none' id="smallPasswordInput" ></small>
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