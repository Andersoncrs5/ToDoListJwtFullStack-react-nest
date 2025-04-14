import { useState } from 'react';
import '../Styles/Register.css';
import BtnsBackSubmit from "../components/btnsBackSubmit.component";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { AxiosResponse } from 'axios';
import RegisterDto from '../DTOs/register.dto';

export default function Register() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const nav: NavigateFunction = useNavigate();

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
        try {
            e.preventDefault();

            const user: RegisterDto = {
                name,
                email,
                password
            }

            const res: AxiosResponse<any, any> = await api.post('/auth/register', user);

            if (res.status == 500) {
                console.error(res.data);
                alert('Error in server the make register');
            }

            if (res.status == 409) {
                alert(res.data);
                borderRedInput('email');
            }

            if (res.status == 200) {
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("refreshToken", res.data.refresh_token);
                await clearInput();
                nav('/main');
            }

        } catch (error) {
            console.error(error);
            alert('Error the make a register! Please try again later');
        }
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
                            
                        </div>
                    </form>
                </div>
            </div>
        </main>  
    );
}