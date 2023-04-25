import { ingredientsActions } from "./actions/ingredients-actions-creator";
import { modalActions } from "./actions/modal-actions-creator";
import { constructorActions } from "./actions/constructor-actions-creator";
import { orderActions } from "./actions/order-actions-creator";
import { userActions } from "./actions/user-actions-creator";
import { authCheckActions } from "./actions/auth-check-actions-creator";
import { getCookie, setCookie, deleteCookie } from "../utils/cookie";
import { store } from "..";
import { TAllActions } from "./actions/union-action-type";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { NavigateFunction } from "react-router";
import { TIngredient } from "../components/ingredients-proptypes";
import { TForm } from "../components/order-proptypes";
import { ThunkDispatch } from "redux-thunk";

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TAllActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

const BURGER_API_URL = 'https://norma.nomoreparties.space/api/';

async function getDataJson(url : string, callback : (json : JSON) => void, dispatch : AppDispatch) {
    const response = await fetch(url);
    if (response.ok) {
        const json = await response.json();
        callback(json);
    } else {
        dispatch(ingredientsActions.initialIngredients());
    }
}

export const fetchData = () => {
    return ((dispatch: AppDispatch) => {
        dispatch(ingredientsActions.requestIngredients());

        const setIngredients = (incomingData : any) => {
            dispatch(ingredientsActions.setIngredients(incomingData.data));
        }

        getDataJson(BURGER_API_URL + 'ingredients', setIngredients, dispatch);
    });
}

// export const sendOrder = async (data : TIngredient[], callback : (json : number) => void, navigate : NavigateFunction) => (dispatch : AppDispatch) => {
// //export const sendOrder = async (data : TIngredient[], callback : (json : number) => void, dispatch : AppDispatch, navigate : NavigateFunction) => {
//     const ingredients = data.map(item => item._id);
//     const orderBurger = (ingredients : string[]) => {
//         return fetch(BURGER_API_URL + "orders", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json;charset=utf-8",
//                 Authorization: getCookie('accessToken'),
//             } as any,
//             body: JSON.stringify({
//                 ingredients,
//             }),
//         })
//         .then(checkResponse);
//     }

//     orderBurger(ingredients)
//         .then((res) => {
//             callback(res.order.number);
//         })
//         .catch((err) => {
//             if (err.message === 'jwt expired') {
//                 //dispatch(refreshToken(sendOrder(data, callback, dispatch, navigate)));
//                 dispatch(refreshToken(sendOrder(data, callback, navigate)));
//             } else {
//                 navigate("/login", { replace: true });
//             }
//         });
// }

const sendOrderRequest = (data : TIngredient[]) => {
    const ingredients = data.map(item => item._id);

    return fetch(BURGER_API_URL + "orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        Authorization: getCookie('accessToken'),
                    } as any,
                    body: JSON.stringify({
                        ingredients,
                    }),
                })
    .then(checkResponse)
}

export const sendOrderData = (data : TIngredient[], navigate : NavigateFunction) => {
    return ((dispatch : AppDispatch) => {
        dispatch(orderActions.requestOrder());

        // const setOrder = (incomingData : any) => {
        //     dispatch(modalActions.openModal());
        //     dispatch(constructorActions.cleanConstructor());
        //     dispatch(orderActions.setOrder(incomingData));
        // }

        sendOrderRequest(data)
        .then((res) => {
            if (res.success) {
                //setOrder(res.data);   
                console.log("RESREQUEST", res);
                dispatch(modalActions.openModal());
                dispatch(constructorActions.cleanConstructor());
                dispatch(orderActions.setOrder(res.order.number));
            }   
        })
        .catch((err) => {
            if (err.message === 'jwt expired') {
                dispatch(refreshToken(sendOrderData(data, navigate)));
            } else {
                navigate("/login", { replace: true });    
            }
        });


        //sendOrder(data, setOrder, dispatch, navigate);
    });
}

export const fetchOrderData = (data : TIngredient[], navigate : NavigateFunction) => {
    return ((dispatch : AppDispatch) => {
        dispatch(orderActions.requestOrder());

        // const setOrder = (incomingData : any) => {
        //     dispatch(modalActions.openModal());
        //     dispatch(constructorActions.cleanConstructor());
        //     dispatch(orderActions.setOrder(incomingData));
        // }

        //new

        getProfileRequest()
        .then((res) => {
            if (res.success) {
                //sendOrder(data, setOrder, dispatch, navigate); 
                dispatch(sendOrderData(data, navigate)); 
                dispatch(userActions.setUser(res.user));       
            }   
        })
        .catch((err) => {
            if (err.message === 'jwt expired') {
                dispatch(refreshToken(fetchOrderData(data, navigate)));
            } else {
                navigate("/login", { replace: true });    
            }
        });


        //sendOrder(data, setOrder, dispatch, navigate);
    });
}

// export const fetchOrderData = (data : TIngredient[], navigate : NavigateFunction) => {
//     return ((dispatch : AppDispatch) => {
//         dispatch(orderActions.requestOrder());

//         const setOrder = (incomingData : any) => {
//             dispatch(modalActions.openModal());
//             dispatch(constructorActions.cleanConstructor());
//             dispatch(orderActions.setOrder(incomingData));
//         }

//         //new

//         getProfileRequest()
//         .then((res) => {
//             if (res.success) {
//                 //sendOrder(data, setOrder, dispatch, navigate); 
//                 sendOrder(data, setOrder, navigate); 
//                 dispatch(userActions.setUser(res.user));       
//             }   
//         })
//         .catch((err) => {
//             if (err.message === 'jwt expired') {
//                 dispatch(refreshToken(fetchOrderData(data, navigate)));
//             } else {
//                 navigate("/login", { replace: true });    
//             }
//         });


//         //sendOrder(data, setOrder, dispatch, navigate);
//     });
// }

// sprint 3

const sendForm = (form : TForm, url : string) => {
    return fetch(
        url,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(form),
        }
    );
}

const sendRefreshToken = () => {
    return fetch(BURGER_API_URL + "auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "token": localStorage.getItem('refreshToken') }),
    })
}



export const registerUser = async (form : TForm, callback : (json : JSON) => void, dispatch : AppDispatch, navigate : NavigateFunction) => {
    const response = await sendForm(form, BURGER_API_URL + "auth/register");
    if (response.ok) {
        const json = await response.json();
        callback(json);
        if (json.success) navigate("/login", { replace: true });
    } else {
        dispatch(userActions.initialUser());
    }
}


export const register = (form : TForm, navigate : NavigateFunction) => {
    return ((dispatch : AppDispatch) => {
        dispatch(userActions.requestUser());
        const setUser = (incomingData : any) => {
            dispatch(userActions.setUser(incomingData.user));
            saveTokens(incomingData.refreshToken, incomingData.accessToken);
        }
        registerUser(form, setUser, dispatch, navigate);
    });
}

export const sendCode = async (form : TForm, navigate : NavigateFunction) => {
    const response = await sendForm(form, BURGER_API_URL + "password-reset");
    if (response.ok) {
        const json = await response.json();
        if (json.success) navigate('/reset-password', { replace: true, state: "reset_password" });
    };
}

export const forgotPasswordRequest = (form : TForm, navigate : NavigateFunction) => {
    return (() => {
        sendCode(form, navigate);
    });
}

export const sendNewPassword = async (form : TForm, navigate : NavigateFunction) => {
    const response = await sendForm(form, BURGER_API_URL + "password-reset/reset");
    if (response.ok) {
        const json = await response.json();
        if (json.success) navigate('/login', { replace: true });
    };
}

export const resetPasswordRequest = (form : TForm, navigate : NavigateFunction) => {
    return (() => {
        sendNewPassword(form, navigate);
    });
}


export const loginUser = async (form: TForm, callback : (json : JSON) => void, dispatch : AppDispatch) => {
    const response = await sendForm(form, BURGER_API_URL + "auth/login");
    if (response.ok) {
        const json = await response.json();
        if (json.success) callback(json);
    } else {
        dispatch(userActions.initialUser());
    }
}

export const login = (form : TForm) => {
    return ((dispatch : AppDispatch) => {
        dispatch(userActions.requestUser());
        const setUser = (incomingData : any) => {
            dispatch(userActions.setUser(incomingData.user));
            saveTokens(incomingData.refreshToken, incomingData.accessToken);
        }
        loginUser(form, setUser, dispatch);
    });
}

const saveTokens = (refreshToken : string, accessToken : string) => {
    deleteCookie('accessToken');
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const logoutUser = async (dispatch : AppDispatch) => {
    const response = await sendRefreshToken();
    if (response.ok) {
        const json = await response.json();
        if (json.success) {
            dispatch(userActions.initialUser());
            dispatch(orderActions.initialOrder());
            deleteCookie('accessToken');
        }
    }
}

export const logout = () => {
    return ((dispatch : AppDispatch) => {
        logoutUser(dispatch);
    });
}

// profile

export const getProfileInfo = () => (dispatch : AppDispatch) => {
    dispatch(userActions.requestUser());
    getProfileRequest()
        .then((res) => {
            dispatch(authCheckActions.isChecked());
            dispatch(userActions.setUser(res.user));
            
        })
        .catch((err) => {
            if (err.message === 'jwt expired') {
                dispatch(refreshToken(getProfileInfo()));
            } else {
                dispatch(authCheckActions.isChecked());
                dispatch(userActions.initialUser());
                
            }
        });
}

export const updateProfileInfo = (form : TForm) => (dispatch : AppDispatch) => {
    dispatch(userActions.requestUser());
    updateProfileRequest(form)
        .then((res) => {
            dispatch(userActions.setUser(res.user));
        })
        .catch((err) => {
            if (err.message === 'jwt expired') {
                dispatch(refreshToken(updateProfileInfo(form)));
            } else {
                dispatch(userActions.initialUser());
            }
        });
}

const updateProfileRequest = (form : TForm) => {
    return fetch(BURGER_API_URL + "auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie('accessToken'),
        } as any,
        body: JSON.stringify(form),
      })
    .then(checkResponse)
}

const getProfileRequest = () => {
    return fetch(BURGER_API_URL + "auth/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken'),
        } as any,
    })
    .then(checkResponse)
}

const refreshToken = (afterRefresh : AppThunkAction) => (dispatch: AppDispatch) => {
    refreshTokenRequest()
        .then((res) => {
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(afterRefresh);
        })
        .catch((err) => {
            dispatch(authCheckActions.isChecked());
        });
}

const refreshTokenRequest = () => {
    return fetch(BURGER_API_URL + "auth/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
    .then(checkResponse)
}

const checkResponse = (res : Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const checkUserAuth = () => (dispatch : AppDispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getProfileInfo())
  } else {
    dispatch(authCheckActions.isChecked());
  }
};
