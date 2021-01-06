import * as types from '../constants/promotion';

export const onGetPromotionActive = () => {
    return {
        type : types.GET_PROMOTION_ACTIVE
    }
}

export const onGetPromotionActiveSuccess = (data) => {
    return {
        type : types.GET_PROMOTION_ACTIVE_SUCCESS,
        payload : {
            data
        }
    }
}

export const onGetAllProductInPromotion = (data) => {
    return {
        type : types.GET_ALL_PRODUCT_IN_PROMOTION_SUCCESS,
        payload : {
            data
        }
    }
}