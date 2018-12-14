import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line
import LogIn from './LogIn';
// eslint-disable-next-line
import SignUp from './SignUp';
// eslint-disable-next-line
import { BrowserRouter as Router, Route } from 'react-router-dom';

import postReducer from './reducers/postReducer';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import authReducer from './reducers/authReducer';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';



const reducer = combineReducers({
    posts: postReducer,
    errors: errorReducer,
    loading: loadingReducer,
    authed: authReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk));




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

