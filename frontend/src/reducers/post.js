import {
    GET_POSTS,
    POSTS_ERRORS,
    ADD_POST_ERROR,
    ADD_POST_LIKE_ERROR,
    REMOVE_POST_LIKE_ERROR,
    GET_POST
    // CLEAR_PROFILE,
    // UPDATE_PROFILE,
    // GET_PROFILES,
    // GET_REPOS,
  } from "../components/actions/types";
  
  const initialState = {
    posts: [],
    loading: true,
    error: {},
    singlePost: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_POSTS:
        return { ...state, posts: payload, loading: false };
      case GET_POST:
        return { ...state, singlePost: payload, loading: false };
      case POSTS_ERRORS:
      case ADD_POST_ERROR:
      case ADD_POST_LIKE_ERROR:
      case REMOVE_POST_LIKE_ERROR:
        
        return { ...state, error: payload, loading: false };



    //   case GET_PROFILES:
    //     return { ...state, profiles: payload, loading: false };
    //   case PROFILE_ERROR:
    //     return { ...state, error: payload, loading: false };
    //   case CLEAR_PROFILE:
    //     return { ...state, profile: null, repos: [], loading: false };
    //   case GET_REPOS:   
    //     return { ...state, repos: payload, loading: false };
      default:
        return state;
    }
  }
  