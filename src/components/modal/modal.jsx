import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from 'react-dom';
import { Tab, CurrencyIcon,CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

import { modalActions } from '../../services/actions/modal-actions-creator';
import { currentIngredientActions } from '../../services/actions/current-ingredient-actions-creator';

function Modal(props) {
  let modal = document.getElementById(props.modalId);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalActions.closeModal());
    dispatch(currentIngredientActions.cleanCurrentIngredient());
  }

  useEffect(() => {
    const handleEsc = (e) => {
       if (e.keyCode === 27) {
        closeModal();
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
}

Modal.propTypes = {
  modalId: PropTypes.string.isRequired,
  overflow: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.element.isRequired
}; 



export default Modal;