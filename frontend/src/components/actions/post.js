import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POSTS_ERRORS,
  ADD_POST,
  ADD_POST_ERROR,
  ADD_LIKE_ON_POST,
  ADD_POST_LIKE_ERROR,
  REMOVE_LIKE_ON_POST,
  REMOVE_POST_LIKE_ERROR,
  DELETE_POSTS_ERRORS,
  DELETE_POSTS
} from "./types";

//Get current users profile
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    console.log(res);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    console.log(res);

    dispatch({
      type: ADD_LIKE_ON_POST,
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: ADD_POST_LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    console.log(res);

    dispatch({
      type: REMOVE_LIKE_ON_POST,
      payload: res.data,
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: REMOVE_POST_LIKE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts`, data);
    console.log(res);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: POSTS_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    console.log(res);

    dispatch({
      type: DELETE_POSTS,
      payload: res.data,
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: DELETE_POSTS_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
