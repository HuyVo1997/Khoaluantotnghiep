import * as types from '../constants/products';


export const onGetAllDiscount = () => {
    return {
        type : types.GET_ALL_CODE
    }
}

export const onGetAllDiscountSuccess = (data) => {
    return {
        type : types.GET_ALL_CODE_SUCCESS,
        payload : {
            data
        }
    }
}

export const onCreateCode = (code) => {
    return {
        type : types.CREATE_CODE,
        payload : {
            code
        }
    }
}

export const onCreateCodeSuccess = (data , code) => {
    return {
        type: types.CREATE_CODE_SUCCESS,
        payload : {
            data,
            code
        }
    }
}