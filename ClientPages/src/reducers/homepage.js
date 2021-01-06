import * as types from '../constants/homepage';

var initialState = {
    listProduct: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_DATA:
            return {
                ...state,
                listProduct: []
            }
        case types.FETCH_DATA_SUCCESS:
            var { data } = action;
            return {
                ...state,
                listProduct: data
            }
        default: return state;
    }
}

export default reducer;