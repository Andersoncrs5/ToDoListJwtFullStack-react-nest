import React from "react";
import '../Styles/Login.css';
import BtnsBackSubmit from "../components/btnsBackSubmit.component";

export default function Login() {
    return (
        <main>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-5 rounded-2 border border-1 shadow">
                    <form action="" method="post">
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" className="form-control"  id="email" />
                            </div>
                            <div className="col-12 mt-1 ">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" className="form-control  "  id="password" />
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
