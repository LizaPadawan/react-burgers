import { ingredientsActions } from "./actions/ingredients-actions-creator";
import { modalActions } from "./actions/modal-actions-creator";
import { constructorActions } from "./actions/constructor-actions-creator";
import { orderActions } from "./actions/order-actions-creator";

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

        const setIngredients = (incomingData) => 
            {
                dispatch(ingredientsActions.setIngredients(incomingData.data));          
            } 
        getDataJson('https://norma.nomoreparties.space/api/ingredients', setIngredients, dispatch);	
	});
}


export const sendOrder = async (data, callback, dispatch) => {
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

        const setOrder = (incomingData) => 
            {
                dispatch(modalActions.openModal());
                dispatch(constructorActions.cleanConstructor());
                dispatch(orderActions.setOrder(incomingData));                
                
            } 

        sendOrder(data, setOrder, dispatch);	
	});
}


