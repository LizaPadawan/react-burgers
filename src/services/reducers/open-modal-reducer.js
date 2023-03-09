import { initialState } from "../initial-state" ;
import { OPEN_MODAL, CLOSE_MODAL } from "../action-types";

const initialStateIsOpenModal = initialState.modalReduser;

export const modalReduser = ( state = initialStateIsOpenModal, action) => {
	console.log(action);
	switch(action.type){
		case OPEN_MODAL:
			return true;

		case CLOSE_MODAL:
			return false;

	    default:
			
		    return state;	
	}
}