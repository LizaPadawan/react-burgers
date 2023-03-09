import { OPEN_MODAL, CLOSE_MODAL } from "../action-types";

export const modalActions = {
    openModal: () => ({type: OPEN_MODAL}),
    closeModal: () => ({type: CLOSE_MODAL})
}