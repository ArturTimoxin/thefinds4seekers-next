import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as app from './app/actions';
import * as main from './main/actions';
import * as admin from './admin/actions';
import * as ad from './ad/actions';
import * as list from './list/actions';

import appReducer from './app/reducer';
import mainReducer from './main/reducer';
import adminReducer from './admin/reducer';
import adReducer from './ad/reducer';
import listReducer from './list/reducer';

export const actions = {
    app,
    main,
    admin,
    ad,
    list,
};

const rootReducer = combineReducers({
    app: appReducer,
    main: mainReducer,
    admin: adminReducer,
    ad: adReducer,
    list: listReducer,
});

const middleware = [thunk];

export let store;

const makeStore = initialState => {
    store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
    return store;
};

export default makeStore;