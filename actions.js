/**
 * action types
 */
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

/**
 * action creators
 */
export const selectSubreddit = (subreddit) => (
  {
    type: SELECT_SUBREDDIT,
    subreddit
  }
);

export const invalidateSubreddit = (subreddit) => (
  {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
);

export const requestPosts = (subreddit) => (
  {
    type: REQUEST_POSTS,
    subreddit
  }
);

export const receivePosts = (subreddit, json) => (
  {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
);

// a thunk action creator
// thunk action creators can dispatch actions and have other side effects
export const fetchPosts = (subreddit) => (
  (dispatch) => {

    // first dispatch: let state know API call is starting
    dispatch(requestPosts(subreddit))
// }``
    // thunk middleware can return a value that is passed on as return value of dispatch method
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())

      // second dispatch: let state know results of API call
      .then(json => dispatch(receivePosts(subreddit, json)))

      // in the real world, catch errors
      .catch(err => { console.err(err); })
  }
);

export const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = (subreddit) => (

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
  (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    } else {
      return Promise.resolve();
    }
  }
)