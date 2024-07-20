import { ReactNode } from "react";
import { createPortal } from "react-dom";

type NewModalProps = {
    setShowInputModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
};


function NewModal({ setShowInputModal, children }: NewModalProps) {

    return createPortal(
        <>
            <div
                className="modalBackdrop"
                onClick={() => {
                    setShowInputModal(false);
                }}
            ></div>
            <div className="modalContent ">{children}</div>
        </>,
        document.getElementById("modal")!
    );
}

export default NewModal;
