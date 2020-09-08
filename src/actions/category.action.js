import axios from "../helpers/axios";
import { categoryConstansts } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getcategory`);
        console.log(res);
        if(res.status === 200){

            const { categoryList } = res.data;

            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        }else{
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post(`/category/create`, form);
        if(res.status === 201){
            dispatch({
                type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
                payload:{ category: res.data.category} 
            });
        }else{
            dispatch({
                type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
                payload: res.data.error
            });
        }
    }
}