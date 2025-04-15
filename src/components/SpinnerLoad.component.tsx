import './componentsStyles/SpinnerStyle.css';

export default function SpinnerLoad() {
    return (
        <div className="text-center divSpinner " >
            <div className="spinner-border" style={{ width: "3rem", height: "3rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}