import * as types from '../constants/review';

export const onCreateReview = (review, jwt) => {
    return {
        type: types.CREATE_REVIEW,
        payload: {
            review,
            jwt
        }
    }
}

export const onCreateReviewSuccess = (data) => {
    return {
        type : types.CREATE_REVIEW_SUCCESS,
        payload : {
            data
        }
    }
}

export const onGetReviewsForProduct = (productID) => {
    return {
        type : types.GET_REVIEWS,
        payload : {
            productID
        }
    }
}

export const onGetReviewsSuccess = (data) => {
    return {
        type : types.GET_REVIEWS_SUCCESS,
        payload : {
            data
        }
    }
}