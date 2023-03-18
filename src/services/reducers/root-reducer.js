import { combineReducers } from 'redux';
import { constructorReduser } from './constructor-reducer';
import { currentIngredientReduser } from './current-ingredient-reducer';
import { ingredientsReduser } from './ingredients-reducer';
import { modalReduser } from './open-modal-reducer';
import { orderReduser } from './order-reducer';
import { userReducer } from './user-reducer';

export const rootReducer = combineReducers({
    constructorReduser,
    currentIngredientReduser,
    ingredientsReduser,
    orderReduser,
    modalReduser,
    userReducer,
}) 