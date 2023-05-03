
    import { TActions, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS } from "../action-types";
import { TWsActions } from "../actions/ws-actions-creator";
    import { initialState, TinitialState } from "../initial-state" ;
  
    export const wsReducer = (state = initialState.wsReducer, action : TWsActions) : TinitialState["wsReducer"] => {
    
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          //error: undefined,
          wsConnected: true,
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          //error: action.payload,
          wsConnected: false,
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          //error: undefined,
          wsConnected: false,
          orders: []
        };


        case WS_GET_ORDERS:
        
        return {
          ...state,
          //error: undefined,
          // wsConnected: true,
          orders: action.payload.data.orders,
          total: action.payload.data.total,
          totalToday: action.payload.data.totalToday,
          //dataIsReady: true,
        };
  
      default:
        return state;
    }
  };
  
  export default wsReducer;