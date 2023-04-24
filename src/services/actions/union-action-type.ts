import { IAuthCheckAction } from "./auth-check-actions-creator";
import { ICleanConstructorAction, ISetConstructorAction } from "./constructor-actions-creator";
import { IFetchIngredientErrorAction, IFetchIngredientRequestAction, IFetchIngredientSuccessAction} from "./ingredients-actions-creator";
import { IOpenModalAction, ICloseModalAction } from "./modal-actions-creator";
import { IFetchOrderErrorAction, IFetchOrderRequestAction, IFetchOrderSuccessAction } from "./order-actions-creator";
import { IFetchUserSuccessAction, IFetchUserErrorAction, IFetchUserRequestAction } from "./user-actions-creator";
import { IWsConnectionCloseAction, IWsConnectionSuccessAction, IWsConnectionErrorAction, IWsConnectionStartAction, IWsGetOrdersAction } from "./ws-actions-creator";

export type TAllActions = IAuthCheckAction|
ICleanConstructorAction|
ISetConstructorAction |
IFetchIngredientErrorAction |
IFetchIngredientRequestAction |
IFetchIngredientSuccessAction |
IOpenModalAction |
ICloseModalAction |
IFetchOrderErrorAction |
IFetchOrderRequestAction |
IFetchOrderSuccessAction |
IFetchUserSuccessAction |
IFetchUserErrorAction |
IFetchUserRequestAction |
IWsConnectionCloseAction |
IWsConnectionSuccessAction |
IWsConnectionErrorAction |
IWsConnectionStartAction |
IWsGetOrdersAction
;