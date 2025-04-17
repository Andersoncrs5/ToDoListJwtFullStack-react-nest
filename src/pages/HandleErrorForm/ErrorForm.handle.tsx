import './styles/ErrorForm.css';

type Props = {
    message: string[];
};

export default function ErrorForm({ message }: Props) {
    if (message.length === 0) return null;

    return (
        <div id="errorInput" className="alert alert-danger rounded-2 text-center">
            {message.map((e, i) => (
                <p className='m-1' key={i}>{e}</p>
            ))}
        </div>
    );
}
