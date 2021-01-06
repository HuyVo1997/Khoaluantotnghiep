import * as types from '../constants/order';

const initialState = {
    listOrder: []
}

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ORDERID:
            return {
                ...state,
                listOrder: []
            }
        case types.GET_ORDERID_SUCCESS:
            var { data } = action.payload;

            var {listOrder} = state;

            listOrder = data;

            return {
                ...state,
                listOrder: [...listOrder]
            }
        default: return state;
    }
}

export default reducer;