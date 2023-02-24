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
