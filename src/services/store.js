import { rootReduser } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';

export const configureStore = (initialState) => {

    const store = createStore(
	    rootReduser,
	    initialState,
        composeWithDevTools(
		    applyMiddleware(thunk
		    )
        )
    );

    return store;
};
