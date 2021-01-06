import * as types from '../constants/coupon';
import { toastSuccess, toastError } from '../helpers/toastHelper';

var intitalState = {
    ListDiscount: []
}

const reducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.GET_ALL_CODE:
            return {
                ...state,
                ListDiscount: []
            }
        case types.SUBMIT_COUPON_SUCCESS:
            var { ListCoupon } = action.payload;

            toastSuccess('Áp Dụng Mã Thành Công');

            return {
                ...state,
                ListDiscount: ListCoupon
            }
        case types.SUBMIT_COUPON_FAILED :
            var error = {message : action.payload.message}

            toastError(error);

            return {
                ...state,
                ListDiscount : []
            }
        default: return state;
    }
}

export default reducer;