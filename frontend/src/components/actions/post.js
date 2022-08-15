import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POSTS_ERRORS } from "./types";

//Get current users profile
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
      console.log(res)

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
