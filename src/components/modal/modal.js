import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Tab, CurrencyIcon,CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal(props) {
  // const [current, setCurrent] = React.useState('one')
  let modal = document.getElementById(props.modalId);

  useEffect(() => {
    const handleEsc = (e) => {
       if (e.keyCode === 27) {
        props.close(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return createPortal(
    <>
     {props.overflow !== "hidden" &&
      <ModalOverlay close={props.close} />
     }
      <div className={modalStyles.panel} >
      <div className={modalStyles.title} >
        <p className="text text_type_main-medium">{props.caption}</p>
        <div onClick={e => {props.close(false)}}>
        <CloseIcon type="primary" />
        </div>
      </div>
          {props.children}
      </div>
    </>
  , modal);
}



export default Modal;