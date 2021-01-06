import * as types from './../constants/homepage';

export const fetchProductList = () => {
    return {
        type: types.FETCH_DATA,
    }
}

export const fetchProductListSuccess = (data) => {
    return {
        type: types.FETCH_DATA_SUCCESS,
        data
    }
}

export const fetchProductListFail = (error) => {
    return {
        type: types.FETCH_DATA_FAILED,
        error
    }
}