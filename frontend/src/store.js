import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const  initialState = {};

const middileware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middileware)));

export default store;