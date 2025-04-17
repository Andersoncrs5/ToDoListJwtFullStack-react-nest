import './StyleAlerts/SuccessAlert.css';

interface Props {
  message: string;
}

export default function SuccessAlert({ message }: Props) {
  return (
    <div id="alertSuccess" style={{ display: 'block' }} className="alert text-center alert-success mx-auto" role="alert">
      {message}
    </div>
  );
}