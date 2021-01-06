import * as types from '../constants/orderdetails';

const initialState = {
    ListOrderDetails: []
}

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ORDER_DETAILS:
            return {
                ...state,
                ListOrderDetails: []
            }
        case types.GET_ORDER_DETAILS_SUCCESS:
            var { data } = action.payload;

            var { ListOrderDetails } = state;

            ListOrderDetails = data;

            return {
                ...state,
                ListOrderDetails: [...ListOrderDetails]
            }
        default: return state;
    }
}

export default reducer;