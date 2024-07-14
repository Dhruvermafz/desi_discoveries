import axios from "axios";
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  WRITE_BLOG_REQUEST,
  WRITE_BLOG_SUCCESS,
  WRITE_BLOG_FAILURE,
  GET_SINGLE_BLOG_REQUEST,
  GET_SINGLE_BLOG_SUCCESS,
  GET_SINGLE_BLOG_FAILURE,
  GET_FEATURED_BLOG_REQUEST,
  GET_FEATURED_BLOG_SUCCESS,
  GET_FEATURED_BLOG_FAILURE,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAILURE,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,
} from "../type/types";
import { BASE_URL } from "../../utils/config";

export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/blogs/`);
    dispatch({ type: FETCH_BLOGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  dispatch({ type: WRITE_BLOG_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/blogs`, blogData);
    dispatch({ type: WRITE_BLOG_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: WRITE_BLOG_FAILURE, payload: error.message });
  }
};

export const getSingleBlog = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_BLOG_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/blogs/${id}`);
    dispatch({ type: GET_SINGLE_BLOG_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_SINGLE_BLOG_FAILURE, payload: error.message });
  }
};

export const getFeaturedBlog = () => async (dispatch) => {
  dispatch({ type: GET_FEATURED_BLOG_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/blogs/featured`);
    dispatch({ type: GET_FEATURED_BLOG_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_FEATURED_BLOG_FAILURE, payload: error.message });
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BLOG_REQUEST });
  try {
    await axios.delete(`${BASE_URL}/blogs/${id}`);
    dispatch({ type: DELETE_BLOG_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_BLOG_FAILURE, payload: error.message });
  }
};

export const updateBlog = (id, blogData) => async (dispatch) => {
  dispatch({ type: UPDATE_BLOG_REQUEST });
  try {
    const response = await axios.put(`${BASE_URL}/blogs/${id}`, blogData);
    dispatch({ type: UPDATE_BLOG_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_BLOG_FAILURE, payload: error.message });
  }
};
