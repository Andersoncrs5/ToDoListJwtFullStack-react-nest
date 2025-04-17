import { useEffect, useState } from 'react';
import './StyleAlerts/ErrorAlert.css';

interface Props {
    message: string;
}

export default function ErrorAlert({ message }: Props) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timeout);
    }, []);

    if (!visible) return null;

    return (
        <div className="alert w-75 alert-danger mx-auto" role="alert">
            {message}
        </div>
    );
}
