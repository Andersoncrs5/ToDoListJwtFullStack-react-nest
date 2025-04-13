import BtnBackHome from "./btnBackHome.component";
import BtnSubmitForm from "./btnSubmitForm.component";

export default function BtnsBackSubmit() {
    return (
        <div className=" mt-1 d-flex justify-content-between">
            <div>
                <BtnSubmitForm />
            </div>
            <div>
                <BtnBackHome />
            </div>
        </div>
    );
}