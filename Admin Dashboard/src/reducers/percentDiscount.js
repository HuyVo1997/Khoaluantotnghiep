import * as types from '../constants/discount';

import { toastSuccess, toastError } from '../helper/toastHelper';

var intitalState = {
    percent: 0
}

const reducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.GET_DISCOUNT:
            return {
                ...state,
                percent: 0
            }

        case types.GET_DISCOUNT_SUCCESS:

            const { data } = action.payload;

            return {
                ...state,
                percent: data
            }
        default: return state;
    }
}

export default reducer;