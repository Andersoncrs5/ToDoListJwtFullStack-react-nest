import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import api from '../../axios/api';
import UserEntity from '../../DTOs/user/user.entity';
import UpdateUserDto from '../../DTOs/user/updateUser.dto';
import BtnsBackSubmit from '../../components/btnsBackSubmit.component';
import SpinnerLoad from '../../components/SpinnerLoad.component';

export default function UpdateUser() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, setUser] = useState<UserEntity>();
    const nav: NavigateFunction = useNavigate();

    useEffect(() => {
        checkToken();
        getUser();
    }, []);

    function checkToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            nav('/task/my-task');
        }
    }

    async function getUser() {
        try {
            const res: AxiosResponse<any, any> = await api.get('/user');

            if (res.status === 200) {
                const userData: UserEntity = res.data;
                setUser(userData);
                setName(userData.name || '');
                setPassword('');
                setEmail(userData.email || '');
            }

            if (res.status === 404) {
                nav('/user/profile');
            }

            if (res.status === 500) {
                setTimeout(() => {
                    alert('Internal server error! Please try again later.');
                }, 4000);
                nav('/user/profile');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function clearInput() {
        setEmail('');
        setName('');
        setPassword('');
    }

    function borderRedInput(nameInput: string) {
        const input: HTMLElement | null = document.getElementById(nameInput);

        if (!input) return;

        input.style.borderColor = 'red';

        setTimeout(() => {
            input.style.borderColor = 'white';
        }, 10000);
    }

    function messageValidInSmall(small: string, message: string) {
        const input: HTMLElement | null = document.getElementById(small);

        if (!input) {
            console.error('Error finding tag <small> with ID:', small);
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

        const spinner = document.getElementById("spinnerDiv");
        if (!spinner) return;
        spinner.style.display = 'block';

        const updatedUser: UpdateUserDto = {
            name,
            password
        };

        try {
            const res: AxiosResponse<any, any> = await api.put('/user', updatedUser);

            if (res.status === 200) {
                spinner.style.display = 'none';
                await clearInput();
                nav('/task/my-tasks');
            }

            if (res.status === 409) {
                spinner.style.display = 'none';
                alert(res.data);
                borderRedInput('email');
                messageValidInSmall('smallNameInput', 'This name is already in use.');
            }

            if (res.status === 500) {
                spinner.style.display = 'none';
                console.error(res.data);
                alert('Server error while updating user.');
            }

        } catch (error) {
            spinner.style.display = 'none';
            console.error(error);
            alert('Unexpected error. Please try again.');
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
                                <input 
                                    onChange={(e) => setName(e.target.value)} 
                                    value={name}
                                    type="text" 
                                    name="name" 
                                    className="form-control"  
                                    id="name" 
                                />
                                <small className='none' id="smallNameInput"></small>
                            </div>
                            <div className="col-12 mt-1">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}
                                    type="password" 
                                    name="password" 
                                    className="form-control"  
                                    id="password" 
                                    required 
                                    maxLength={50} 
                                    minLength={6}  
                                />
                                <small className='none' id="smallPasswordInput"></small>
                            </div>
                            <div className="col-12">
                                <BtnsBackSubmit />
                            </div>
                            <div id="spinnerDiv" style={{ display: 'none' }}>
                                <SpinnerLoad />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>  
    );
}
