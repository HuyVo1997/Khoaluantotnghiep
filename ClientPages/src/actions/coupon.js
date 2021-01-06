import * as types from '../constants/coupon';

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

export const SubmitCoupon = (Coupon, email) => {
    return {
        type : types.SUBMIT_COUPON,
        payload : {
            Coupon,
            email
        }
    }
}

export const SubmitCouponSuccess = (ListCoupon) => {
    return {
        type : types.SUBMIT_COUPON_SUCCESS,
        payload : {
            ListCoupon
        }
    }
} 

export const SubmitCouponFailed = (message) => {
    return {
        type : types.SUBMIT_COUPON_FAILED,
        payload : {
            message
        }
    }
}