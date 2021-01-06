import * as types from '../constants/products';
import { toastSuccess, toastError } from '../helper/toastHelper';

var intitalState = {
    ListProductPromotion: []
}

const reducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.GET_ALL_PRODUCT_PROMOTION:
            return {
                ...state,
                ListProductPromotion: []
            }
        case types.GET_ALL_PRODUCT_PROMOTION_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                ListProductPromotion: data
            }
        default: return state;
    }
}

export default reducer;