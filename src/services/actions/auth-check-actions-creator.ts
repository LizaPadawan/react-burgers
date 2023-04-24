import { AUTH_CHECKED } from "../action-types";

export interface IAuthCheckAction {
    readonly type: typeof AUTH_CHECKED;
}

export const authCheckActions = {
    isChecked: () : IAuthCheckAction  => ({type: AUTH_CHECKED}),
}