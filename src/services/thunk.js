import { ingredientsActions } from "./actions/ingredients-actions-creator";
import { modalActions } from "./actions/modal-actions-creator";
import { constructorActions } from "./actions/constructor-actions-creator";
import { orderActions } from "./actions/order-actions-creator";
import { userActions } from "./actions/user-actions-creator";
import { getCookie, setCookie } from "../utils/cookie";

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
    return ((dispatch, getState, extra) => {
        console.info("start fetching...");
        dispatch(ingredientsActions.requestIngredients());

        const setIngredients = (incomingData) => {
            dispatch(ingredientsActions.setIngredients(incomingData.data));
        }

        getDataJson('https://norma.nomoreparties.space/api/ingredients', setIngredients, dispatch);
    });
}


export const sendOrder = async (data, callback, dispatch) => {
    //console.log(data);
    const ingredients = data.map(item => item._id);

    const orderBurger = (ingredients) => {
        return fetch("https://norma.nomoreparties.space/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                ingredients,
            }),
        });
    }

    const response = await orderBurger(ingredients);
    if (response.ok) {
        const json = await response.json();
        callback(json.order.number);
    } else {
        dispatch(orderActions.initialOrder());
    }
}

export const fetchOrderData = (data) => {
    return ((dispatch, getState, extra) => {
        dispatch(orderActions.requestOrder());

        const setOrder = (incomingData) => {
            dispatch(modalActions.openModal());
            dispatch(constructorActions.cleanConstructor());
            dispatch(orderActions.setOrder(incomingData));
        }

        sendOrder(data, setOrder, dispatch);
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

const sendRefreshToken = (url) => {
    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"token": getCookie("refreshToken")}),
      })
}

export const registerUser = async (form, callback, dispatch, navigate) => {
    const response = await sendForm(form, "https://norma.nomoreparties.space/api/auth/register");
    if (response.ok) {
        const json = await response.json();
        callback(json);
        if (json.success) navigate("/login", { replace: true });
    } else {
        dispatch(userActions.initialUser());
    }
}

export const register = (form, navigate) => {
    return ((dispatch, getState, extra) => {
        dispatch(userActions.requestUser());
        const setUser = (incomingData) => {
            dispatch(userActions.setUser(incomingData));
            saveTokens(incomingData.refreshToken, incomingData.accessToken);
        }
        registerUser(form, setUser, dispatch, navigate);
    });
}

export const sendCode = async (form, dispatch, navigate) => {
    const response = await sendForm(form, "https://norma.nomoreparties.space/api/password-reset");
    if (response.ok) {
        const json = await response.json();
        if (json.success) navigate('/reset-password', { replace: true });
    };
}

export const forgotPasswordRequest = (form, navigate) => {
    return ((dispatch, getState, extra) => {
        sendCode(form, dispatch, navigate);
    });
}

export const sendNewPassword = async (form, dispatch, navigate) => {
    const response = await sendForm(form, "https://norma.nomoreparties.space/api/password-reset/reset");
    if (response.ok) {
        const json = await response.json();
        if (json.success) navigate('/login', { replace: true });
    };
}

export const resetPasswordRequest = (form, navigate) => {
    return ((dispatch, getState, extra) => {
        sendNewPassword(form, dispatch, navigate);
    });
}

export const loginUser = async (form, callback, dispatch, navigate) => {
    const response = await sendForm(form, "https://norma.nomoreparties.space/api/auth/login");
    if (response.ok) {
        const json = await response.json();
        callback(json);
        if (json.success) navigate("/", { replace: true });
    } else {
        dispatch(userActions.initialUser());
    }
}

export const login = (form, navigate) => {
    return ((dispatch, getState, extra) => {
        dispatch(userActions.requestUser());
        const setUser = (incomingData) => {
            dispatch(userActions.setUser(incomingData));
            saveTokens(incomingData.refreshToken, incomingData.accessToken);
        }
        loginUser(form, setUser, dispatch, navigate);
    });
}

const saveTokens = (refreshToken, accessToken) => {
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const logoutUser = async (dispatch, navigate) => {
    const response = await sendRefreshToken("https://norma.nomoreparties.space/api/auth/logout");
    if (response.ok) {
        const json = await response.json();
        if (json.success) {
            dispatch(userActions.initialUser());
            navigate("/login", { replace: true });
        }
    }
}

export const logout = (navigate) => {
    return ((dispatch, getState, extra) => {
        logoutUser(dispatch, navigate);
    });
}

