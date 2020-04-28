import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as app from './app/actions';
import * as main from './main/actions';

import appReducer from './app/reducer';
import mainReducer from './main/reducer';

export const actions = {
    app,
    main,
};

const rootReducer = combineReducers({
    app: appReducer,
    main: mainReducer,
});

const middleware = [thunk];

export let store;

const makeStore = initialState => {
    store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
    return store;
};

export default makeStore;