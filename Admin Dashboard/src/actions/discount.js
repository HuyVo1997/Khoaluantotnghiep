import * as types from '../constants/discount';

export const onGetDiscount = () => {
    return {
        type : types.GET_DISCOUNT
    }
}

export const onGetDiscountSuccess = (data) => {
    return {
        type : types.GET_DISCOUNT_SUCCESS,
        payload : {
            data
        }
    }
}