import ReactDOM from 'react-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalStyles from './modal.module.css';

export const Modal = (props) => {

    const portal = document.getElementById("portal");
    console.log("portal",portal);

    if (props.isOpen) {
        return ReactDOM.createPortal(
            <div className={modalStyles.block}>
                {/* <ModalOverlay onClose={props.onClose} /> */}
                <div className={modalStyles.container}>
                    <h2 className="text text_type_main-large">
                        {props.title || ""}
                    </h2>
                    <button onClick={() => props.onClose()} className={modalStyles.close}>
                        <CloseIcon type="primary" />
                    </button>
                    {props.children}

                </div>
            </div>,
            portal
        );

    } else {
        return ReactDOM.createPortal(
            <></>,
            portal
        );

    }    

}