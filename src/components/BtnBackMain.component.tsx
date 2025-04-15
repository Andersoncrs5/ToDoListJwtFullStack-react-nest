import { useNavigate } from "react-router-dom";

export default function BtnBackMain() {

    const nav = useNavigate();

    function RedirectHomePage() {
        nav('/task/my-tasks');
    }

    return (
        <button onClick={RedirectHomePage} className="btn btn-outline-light">BACK</button>
    );
}