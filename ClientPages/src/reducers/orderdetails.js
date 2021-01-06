import * as types from '../constants/orderdetail';

const initialState = {
    listOrderDetails: []
}

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ORDER_DETAILS:
            return {
                ...state,
                listOrderDetails: []
            }
        case types.GET_ORDER_DETAILS_SUCCESS:
            var { data } = action.payload;

            var {listOrderDetails} = state;

            listOrderDetails = data;

            return {
                ...state,
                listOrderDetails: [...listOrderDetails]
            }
        default: return state;
    }
}

export default reducer;