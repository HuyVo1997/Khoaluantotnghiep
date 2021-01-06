import * as types from '../constants/token';

export const setToken = (username, token, email) => {
    return {
        type: types.SET_TOKEN,
        payload: {
            username,
            token,
            email
        }
    }
}

export const getToken = () => {
    return {
        type: types.GET_TOKEN
    }
}