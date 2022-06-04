import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { combineReducers,compose,applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import placeDataReducer from './store/reducers/location';


import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-social/bootstrap-social.css';
import 'animate.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const rootReducer = combineReducers({
  place:placeDataReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootstore = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={rootstore}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
      
  
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
