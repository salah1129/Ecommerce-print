import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  customerLoginReducer,
  customerRegisterReducer,
  customerUpdateReducer,
} from "./reducers/customerReducers";

const reducer = combineReducers({
    customerLogin: customerLoginReducer,
    customerRegister: customerRegisterReducer,
    customerUpdate: customerUpdateReducer,
});

const customerInfoFromStorage = localStorage.getItem("customerInfo")
  ? JSON.parse(localStorage.getItem("customerInfo"))
  : null;

const initialState = {
    customerLogin: { customerInfo: customerInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
