import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props) {
  return (
    <div className={modalOverlayStyles.main} onClick={e => {props.close(false)}}>
    
    </div>
     
 );
}

export default ModalOverlay;

 ModalOverlay.propTypes = {
   close: PropTypes.func.isRequired,
 }; 
