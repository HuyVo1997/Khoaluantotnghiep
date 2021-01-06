import * as types from '../constants/login';

export const LoginSubmit = (user, history) => {
    return {
        type: types.LOGIN,
        payload: {
            user,
            history
        }
    }
}

export const loginSuccess = (message) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            message
        }
    }
}

export const loginFail = (error) => {
    return {
        type: types.LOGIN_FAILED,
        payload: {
            error
        }
    }
}

export const loginFacebook = (userID, name, email) => {
    return {
        type: types.LOGIN_FACEBOOK,
        payload: {
            userID,
            name,
            email
        }
    }
}
