import * as types from '../constants/products'


export const onGetAllPromotion = () => {
    return {
        type : types.GET_ALL_PROMOTION
    }
}

export const onGetAllPromotionSuccess = (data) => {
    return {
        type : types.GET_ALL_PROMOTION_SUCCESS,
        payload : {
            data
        }
    }
}

export const onDeletePromotion = (promotionID) => {
    return {
        type : types.DELETE_PROMOTION,
        payload : {
            promotionID
        }
    }
}

export const onAddPromotion = (promotionDTO) => {
    return {
        type: types.ADD_PROMOTION,
        payload: {
            promotionDTO
        }
    }
}

export const onAddPromotionSuccess = (data) => {
    return {
        type: types.ADD_PROMOTION_SUCCESS,
        payload: {
            data
        }
    }
}

export const onGetProductPromotion = () => {
    return {
        type : types.GET_ALL_PRODUCT_PROMOTION,
    }
}

export const onGetProductPromotionSuccess = (data) => {
    return {
        type : types.GET_ALL_PRODUCT_PROMOTION_SUCCESS,
        payload : {
            data
        }
    }
}