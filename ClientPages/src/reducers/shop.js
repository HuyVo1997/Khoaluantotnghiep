import * as types from './../constants/shop';

var initialState = {
    productsByType: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS_BY_TYPE:
            return {
                ...state,
                productsByType: [],
            }
        case types.GET_PRODUCT_BY_TYPE_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                productsByType: data
            }
        default: return state;
    }
}

export default reducer;