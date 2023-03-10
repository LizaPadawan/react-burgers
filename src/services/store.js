import { rootReducer } from "./reducers/root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';

export const configureStore = (initialState) => {

    const store = createStore(
	    rootReducer,
	    initialState,
        composeWithDevTools(
		    applyMiddleware(thunk
		    )
        )
    );

    return store;
};


