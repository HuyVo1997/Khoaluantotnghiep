import * as types from '../constants/login';
import { toastError, toastSuccess } from '../helpers/toastHelper';

var initialState = -1;

const reducer = (state = initialState , action) => {
    switch(action.type){
        case types.LOGIN_SUCCESS:
            toastSuccess(action.payload.message);
            return -1;
        case types.LOGIN_FAILED:
            var {error} = action.payload
            toastError(error);
            return -1;
        default : return state;
    }
}

export default reducer;