import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { FC } from 'react';

type TModalOverlayProps = {
  close: (param : boolean) => void,
}; 

const ModalOverlay : FC <TModalOverlayProps> = (props) => {
  return (
    <div className={modalOverlayStyles.main} onClick={() => {props.close(false)}}>
    </div>     
 );
}

export default ModalOverlay;
