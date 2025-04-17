import './StyleAlerts/ErrorAlert.css';

interface Props {
    message: string;
}

export default function ErrorAlert({ message }: Props) {

    return (
        <div id="ErrorAlert" className="alert text-center alert-danger mx-auto" role="alert">
            {message}
        </div>
    );
}
