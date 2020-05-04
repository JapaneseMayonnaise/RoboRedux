import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { searchRobots, requestRobots } from './reducers';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
   
const logger = createLogger();

const rootReducer =  combineReducers({searchRobots, requestRobots});

const store = createStore(rootReducer, 
                          applyMiddleware(thunkMiddleware, logger));  

// Provider passes store all the way down to the bottom hierarchy 
// of the component tree
ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('root'));

registerServiceWorker();