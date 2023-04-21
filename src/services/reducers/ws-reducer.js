// const initialState = {
//     wsConnected: false,
//     orders: {},
//     error: undefined,
//     dataIsReady: false
//   };

    import { initialState } from "../initial-state" ;
  
    export const wsReducer = (state = initialState, action) => {
    console.log("wsReducer",action.type,action.payload);
    switch (action.type) {
      case "WS_CONNECTION_SUCCES":
        return {
          ...state,
          error: undefined,
          wsConnected: true,
        };
  
      case "WS_CONNECTION_ERROR":
        return {
          ...state,
          error: action.payload,
          wsConnected: false,
        };
  
      case "WS_CONNECTION_CLOSED":
        return {
          ...state,
          error: undefined,
          wsConnected: false,
          orders: []
        };
  
    //   case "WS_GET_MESSAGE":
        
    //     return {
    //       ...state,
    //       error: undefined,
    //       // wsConnected: true,
    //       orders: action.payload,
    //       dataIsReady: true,
    //     };

        case "WS_GET_ORDERS":
        
        return {
          ...state,
          error: undefined,
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