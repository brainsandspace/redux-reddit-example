import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { selectSubreddit, fetchPostsIfNeeded } from './actions.js';
import rootReducer from './reducers/index.js';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,

  // to get devtools extension working
  compose(
    // middleware chain to be applied
    applyMiddleware(
      thunkMiddleware, // lets us dispatch functions
      loggerMiddleware // supposedly neat middleware for logging actions,
  ),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// to populate asynchronous initial state
store.dispatch(selectSubreddit('trees'));
store.dispatch(fetchPostsIfNeeded('trees')).then(() => 
  console.log(store.getState())
); 