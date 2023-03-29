// import { initialState } from "../initial-state" ;
// import { OPEN_MODAL, CLOSE_MODAL } from "../action-types";

// const initialStateIsOpenModal = initialState.modalReduser;

// export const modalReduser = ( state = initialStateIsOpenModal, action) => {
// 	//console.log(action);
// 	switch(action.type){
// 		case OPEN_MODAL:
// 			return true;

// 		case CLOSE_MODAL:
// 			return false;

// 	    default:
			
// 		    return state;	
// 	}
// }

import { initialState } from "../initial-state" ;
import { OPEN_MODAL, CLOSE_MODAL } from "../action-types";

//const initialStateIsOpenModal = initialState.modalReduser.isModalOpen;

export const modalReduser = ( state = initialState, action) => {
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