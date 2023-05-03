import { initialState, TinitialState } from "../initial-state" ;
import { OPEN_MODAL, CLOSE_MODAL } from "../action-types";
import { TActions } from "../action-types";
import { TModalActions } from "../actions/modal-actions-creator";

//const initialStateIsOpenModal = initialState.modalReduser.isModalOpen;

export const modalReduser = ( state = initialState.modalReduser, action : TModalActions) : TinitialState["modalReduser"] => {
	//console.log(action);
	switch(action.type){
		case OPEN_MODAL:
			return {
				...state,
				isModalOpen: true
			};

		case CLOSE_MODAL:
			return {
				...state,
				isModalOpen: false
			};

	    default:
			
		    return state;	
	}
}