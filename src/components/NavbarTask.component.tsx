import React from "react"
import '../Styles/Tasks/NavbarTask.css';
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function NavbarTask() {
    const nav: NavigateFunction = useNavigate();

    function profile() {
        nav('/user/profile');
    }

    function CreateTask() {
        nav('/task/create');
    }

    return (
        <header className="container-fluid">
            <div className="row p-2 ">
                <div className="col-3">
                    <h2> My Tasks </h2>
                </div>
                <div className="col-5"></div>
                <div className="col-4 text-center ">
                    <button onClick={CreateTask} className="btn btn-lg ms-1 btn-outline-light" > NEW TASK </button>
                    <button onClick={profile} className="btn btn-lg ms-1 btn-outline-light" > <i className="fa-regular fa-circle-user"></i> </button>
                    <button className="btn btn-lg ms-1 btn-outline-light" > <i className="fa-solid fa-right-from-bracket" /> </button>
                </div>
            </div>
        </header>
    )
}