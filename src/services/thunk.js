import { actionCreators } from "./action-creator";

async function getDataJson(url, callback, dispatch) {
    const response = await fetch(url); 
        if (response.ok) {  
          const json = await response.json();
          callback(json);
        } else {
          alert(`Ошибка HTTP: ${response.status}`);
          dispatch(actionCreators.fetchIngredientsState("error")); 
        }
  }

export const fetchData = () => {
	return ((dispatch, getState, extra) => {
		console.info("start fetching...");
        dispatch(actionCreators.fetchIngredientsState("process"));

        const setIngredients = (incomingData) => 
            {
                dispatch(actionCreators.fetchIngredients(incomingData.data));
                dispatch(actionCreators.fetchIngredientsState("success"));           
            } 
        getDataJson('https://norma.nomoreparties.space/api/ingredients', setIngredients, dispatch);	
	});
}


export const sendOrder = async (data, callback) => {
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
      console.log("json=", json);
      callback(json.order);
  } else {
      // alert(`Ошибка HTTP: ${response.status}`);
  }
}

export const fetchOrderData = (data) => {
	return ((dispatch, getState, extra) => {
		console.info("start fetching...");
        //dispatch(actionCreators.fetchIngredientsState("process"));

        const setOrder = (incomingData) => 
            {
                dispatch(actionCreators.fetchOrder(incomingData));
                //dispatch(actionCreators.fetchIngredientsState("success"));           
            } 
        sendOrder(data, setOrder);	
	});
}


