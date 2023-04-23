import { combineReducers } from 'redux';
import { constructorReduser } from './constructor-reducer';
import { currentIngredientReduser } from './current-ingredient-reducer';
import { ingredientsReduser } from './ingredients-reducer';
import { modalReduser } from './open-modal-reducer';
import { orderReduser } from './order-reducer';
import { userReducer } from './user-reducer';
import { authCheckReducer } from './auth-check-reducer';
import wsReducer from './ws-reducer';

export const rootReducer = combineReducers({
    constructorReduser,
    currentIngredientReduser,
    ingredientsReduser,
    orderReduser,
    modalReduser,
    userReducer,
    authCheckReducer,
    wsReducer
}) 