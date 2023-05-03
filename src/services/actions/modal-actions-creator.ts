import { OPEN_MODAL, CLOSE_MODAL } from "../action-types";

export interface IOpenModalAction {
    readonly type: typeof OPEN_MODAL;
}

export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;

export const modalActions = {
    openModal: () : IOpenModalAction => ({type: OPEN_MODAL}),
    closeModal: (): ICloseModalAction => ({type: CLOSE_MODAL})
}