import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay(props) {
  return (
    <div className={modalOverlayStyles.main} onClick={e => {props.close(false)}}>
    
    </div>
     
 );
}

export default ModalOverlay;
