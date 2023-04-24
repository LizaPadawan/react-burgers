import { ingredientsActions } from "./actions/ingredients-actions-creator";
import { modalActions } from "./actions/modal-actions-creator";
import { constructorActions } from "./actions/constructor-actions-creator";
import { orderActions } from "./actions/order-actions-creator";
import { userActions } from "./actions/user-actions-creator";
import { authCheckActions } from "./actions/auth-check-actions-creator";
import { getCookie, setCookie, deleteCookie } from "../utils/cookie";

const BURGER_API_URL = 'https://norma.nomoreparties.space/api/';

async function getDataJson(url, callback, dispatch) {
    const response = await fetch(url);
    if (response.ok) {
        const json = await response.json();
        callback(json);
    } else {
        dispatch(ingredientsActions.initialIngredients());
    }
}

export const fetchData = () => {
    //return ((dispatch, getState, extra) => {
    return ((dispatch) => {
        //console.info("start fetching...");
        dispatch(ingredientsActions.requestIngredients());

        const setIngredients = (incomingData) => {
            dispatch(ingredientsActions.setIngredients(incomingData.data));
        }

        getDataJson(BURGER_API_URL + 'ingredients', setIngredients, dispatch);
    });
}


export const sendOrder = async (data, callback, dispatch, navigate) => {
    const ingredients = data.map(item => item._id);
    //console.log("I try to send order");

    const orderBurger = (ingredients) => {
        return fetch(BURGER_API_URL + "orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: getCookie('accessToken'),
            },
            //Authorization: getCookie('accessToken'),
            body: JSON.stringify({
                ingredients,
            }),
        })
        .then(checkResponse);
    }

    orderBurger(ingredients)
        .then((res) => {
            callback(res.order.number);
        })
        .catch((err) => {
            if (err.message === 'jwt expired') {
                dispatch(refreshToken(sendOrder(data, callback, dispatch, navigate)));
            } else {
                //dispatch(orderActions.initialOrder());
                navigate("/login", { replace: true });
            }
        });
}

export const fetchOrderData = (data, navigate) => {
    // return ((dispatch, getState, extra) => {
    return ((dispatch) => {
        dispatch(orderActions.requestOrder());

        const setOrder = (incomingData) => {
            dispatch(modalActions.openModal());
            dispatch(constructorActions.cleanConstructor());
            dispatch(orderActions.setOrder(incomingData));
        }

        //new

        getProfileRequest()
        .then((res) => {
            if (res.success) {
                sendOrder(data, setOrder, dispatch, navigate); 
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

// sprint 3

const sendForm = (form, url) => {
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



export const registerUser = async (form, callback, dispatch, navigate) => {
    const response = await sendForm(form, BURGER_API_URL + "auth/register");
    if (response.ok) {
        const json = await response.json();
        callback(json);
        if (json.success) navigate("/login", { replace: true });
    } else {
        dispatch(userActions.initialUser());
    }
}

// export const register = (form, navigate) => {
//     return ((dispatch, getState, extra) => {
//         dispatch(userActions.requestUser());
//         const setUser = (incomingData) => {
//             dispatch(userActions.setUser(incomingData.user));
//             saveTokens(incomingData.refreshToken, incomingData.accessToken);
//         }
//         registerUser(form, setUser, dispatch, navigate);
//     });
// }

// export const sendCode = async (form, dispatch, navigate) => {
//     const response = await sendForm(form, BURGER_API_URL + "password-reset");
//     if (response.ok) {
//         const json = await response.json();
//         if (json.success) navigate('/reset-password', { replace: true, state: "reset_password" });
//     };
// }

// export const forgotPasswordRequest = (form, navigate) => {
//     return ((dispatch, getState, extra) => {
//         sendCode(form, dispatch, navigate);
//     });
// }

export const register = (form, navigate) => {
    return ((dispatch) => {
        dispatch(userActions.requestUser());
        const setUser = (incomingData) => {
            dispatch(userActions.setUser(incomingData.user));
            saveTokens(incomingData.refreshToken, incomingData.accessToken);
        }
        registerUser(form, setUser, dispatch, navigate);
    });
}

export const sendCode = async (form, navigate) => {
    const response = await sendForm(form, BURGER_API_URL + "password-reset");
    if (response.ok) {
        const json = await response.json();
        if (json.success) navigate('/reset-password', { replace: true, state: "reset_password" });
    };
}

export const forgotPasswordRequest = (form, navigate) => {
    return (() => {
        sendCode(form, navigate);
    });
}

// export const sendNewPassword = async (form, dispatch, navigate) => {
//     const response = await sendForm(form, BURGER_API_URL + "password-reset/reset");
//     if (response.ok) {
//         const json = await response.json();
//         if (json.success) navigate('/login', { replace: true });
//     };
// }

// export const resetPasswordRequest = (form, navigate) => {
//     return ((dispatch, getState, extra) => {
//         sendNewPassword(form, dispatch, navigate);
//     });
// }

export const sendNewPassword = async (form, navigate) => {
    const response = await sendForm(form, BURGER_API_URL + "password-reset/reset");
    if (response.ok) {
        const json = await response.json();
        if (json.success) navigate('/login', { replace: true });
    };
}

export const resetPasswordRequest = (form, navigate) => {
    return (() => {
        sendNewPassword(form, navigate);
    });
}

//export const loginUser = async (form, callback, dispatch, navigate) => {
export const loginUser = async (form, callback, dispatch) => {
    const response = await sendForm(form, BURGER_API_URL + "auth/login");
    if (response.ok) {
        const json = await response.json();
        //  callback(json);
        //  if (json.success) navigate("/", { replace: true });
        if (json.success) callback(json);
    } else {
        dispatch(userActions.initialUser());
    }
}

export const login = (form, navigate) => {
    //return ((dispatch, getState, extra) => {
    return ((dispatch) => {
        dispatch(userActions.requestUser());
        const setUser = (incomingData) => {
            //console.log("incoming data = ", incomingData);
            dispatch(userActions.setUser(incomingData.user));
            saveTokens(incomingData.refreshToken, incomingData.accessToken);
        }
        loginUser(form, setUser, dispatch, navigate);
    });
}

const saveTokens = (refreshToken, accessToken) => {
    deleteCookie('accessToken');
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const logoutUser = async (dispatch) => {
    const response = await sendRefreshToken(BURGER_API_URL + "auth/logout");
    if (response.ok) {
        const json = await response.json();
        if (json.success) {
            dispatch(userActions.initialUser());
            dispatch(orderActions.initialOrder());
            deleteCookie('accessToken');
            //console.log("logout ok");
        }
    }
}

export const logout = () => {
    //return ((dispatch, getState, extra) => {
    return ((dispatch) => {
        logoutUser(dispatch);
    });
}

// profile



export const getProfileInfo = () => (dispatch) => {
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

export const updateProfileInfo = (form) => (dispatch) => {
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

const updateProfileRequest = (form) => {
    //console.log("get profile request");
    return fetch(BURGER_API_URL + "auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie('accessToken'),
        },
        body: JSON.stringify(form),
      })
    .then(checkResponse)
}

const getProfileRequest = () => {
    //console.log("get profile request");
    return fetch(BURGER_API_URL + "auth/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: getCookie('accessToken'),
        },
    })
    .then(checkResponse)
}

const refreshToken = (afterRefresh) => (dispatch) => {
    refreshTokenRequest()
        .then((res) => {
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(afterRefresh);
        })
        .catch((err) => {
            //console.log(err.message);
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

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const checkUserAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getProfileInfo())
  } else {
    dispatch(authCheckActions.isChecked());
  }
};
