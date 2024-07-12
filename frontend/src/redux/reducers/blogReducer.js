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

const initialState = {
  blogs: [],
  featuredBlog: null,
  singleBlog: null,
  loading: false,
  error: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
    case WRITE_BLOG_REQUEST:
    case GET_SINGLE_BLOG_REQUEST:
    case GET_FEATURED_BLOG_REQUEST:
    case DELETE_BLOG_REQUEST:
    case UPDATE_BLOG_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };
    case WRITE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.payload],
      };
    case GET_SINGLE_BLOG_SUCCESS:
      return { ...state, loading: false, singleBlog: action.payload };
    case GET_FEATURED_BLOG_SUCCESS:
      return { ...state, loading: false, featuredBlog: action.payload };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
      };
    case FETCH_BLOGS_FAILURE:
    case WRITE_BLOG_FAILURE:
    case GET_SINGLE_BLOG_FAILURE:
    case GET_FEATURED_BLOG_FAILURE:
    case DELETE_BLOG_FAILURE:
    case UPDATE_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default blogReducer;
