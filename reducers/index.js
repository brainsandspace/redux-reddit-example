/** Example state
 {
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
 **/

import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions.js';

const selectedSubreddit = (state = 'trees', action) => {
  switch (action.type) {
    
    case SELECT_SUBREDDIT: 
      return action.subreddit;

    default: 
      return state;
  }
};

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    
    case INVALIDATE_SUBREDDIT:
      return { 
        ...state, 
        didInvalidate: true 
      };

    case REQUEST_POSTS:
      return { 
        ...state, 
        isFetching: true,
        didInvalidate: false
      }

    case RECEIVE_POSTS: 
    console.log('received posts', action.posts)
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: Date.now()
      };

    default:
      return state;
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {

    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      // uses es2015 object spread operator and computed property syntax
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      };

    default: 
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;