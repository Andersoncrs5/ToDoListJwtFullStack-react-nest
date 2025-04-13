import React from "react";
import '../Styles/Home.css';
import { useNavigate } from "react-router-dom";

export default function Home() {

    const nav = useNavigate();

    function RedirectLoginPage() {
        nav("/login");
    }

    function RedirectRegisterPage() {
        nav("/register");
    }

    return (
        <main>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-5 rounded-2 border border-1 shadow text-white">
                    <button onClick={RedirectLoginPage} className="btn btn-outline-light me-1">Login</button>
                    <button onClick={RedirectRegisterPage} className="btn btn-outline-light">Register</button>
                </div>
            </div>
        </main>  
    );
}
