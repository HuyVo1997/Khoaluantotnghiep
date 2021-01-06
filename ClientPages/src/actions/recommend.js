import * as types from '../constants/recommend';

export const getRecommendProduct = (email, jwt) => {
    return {
        type: types.GET_PRODUDCT_RECOMMEND,
        payload: {
            email,
            jwt
        }
    }
}

export const getRecommendProductSuccess = (data) => {
    return {
        type: types.GET_PRODUDCT_RECOMMEND_SUCCESS,
        payload: {
            data
        }
    }
}