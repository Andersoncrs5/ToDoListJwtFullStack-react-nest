import { useNavigate } from "react-router-dom";

export default function BtnBackHome() {

    const nav = useNavigate();

    function RedirectHomePage() {
        nav('/');
    }

    return (
        <button onClick={RedirectHomePage} className="btn btn-outline-light">BACK</button>
    );
}