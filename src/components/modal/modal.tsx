import { useEffect, FC, ReactNode } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from 'react-dom';
import { Tab, CurrencyIcon,CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

import { modalActions } from '../../services/actions/modal-actions-creator';
import { currentIngredientActions } from '../../services/actions/current-ingredient-actions-creator';

type TModalProps = {
    modalId: string,
    onClose: () => void,
    overflow?: string,
    caption?: string,
    children: ReactNode
}; 

const Modal : FC <TModalProps> = (props) => {
  let modal = document.getElementById(props.modalId);
  //const dispatch = useDispatch();

  const closeModal = props.onClose;

  useEffect(() => {
    const handleEsc = (e : KeyboardEvent) => {
       if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (modal) {

  return createPortal(
    <>
     {props.overflow !== "hidden" &&
      <ModalOverlay 
      close = {closeModal}
      />
     }
      <div className={modalStyles.panel} >
      <div className={modalStyles.title} >
        <p className="text text_type_main-medium">{props.caption}</p>
        <div style={{zIndex:10}} onClick={() => {
          closeModal();
          }}>
        <CloseIcon type="primary" />
        </div>
      </div>
          {props.children}
      </div>
    </>
  , modal);

  } else return <></>
}

export default Modal;