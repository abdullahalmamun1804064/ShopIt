import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {productsReducer , productDetailsReducer} from './reducers/productReducers'
import {authReducer} from './reducers/useReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth:authReducer
})

let initialState = {}

const middlware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)));

export default store;