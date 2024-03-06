import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,

} from "../constants/productConstants";

// productListReducer.js

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, error: null, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload, error: null };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {...state, loading: true}
    case PRODUCT_DETAILS_SUCCESS:
      return {...state, loading:false, product: action.payload}
    case PRODUCT_DETAILS_FAIL:
      return {...state, loading:false, error: action.payload }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = initialState, action) => {
 switch (action.type) {
  case PRODUCT_CREATE_REVIEW_REQUEST:
    return {...state, loading:true}
  case PRODUCT_CREATE_REVIEW_SUCCESS:
    return {...state, loading: false, success:true }
  case PRODUCT_CREATE_REVIEW_FAIL:
    return {...state, loading:false, error:action.payload} 
  case PRODUCT_CREATE_REVIEW_RESET:
    return {}      
 
  default:
    return state ;
 }
}
