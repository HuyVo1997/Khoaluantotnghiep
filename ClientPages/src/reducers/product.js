import * as types from './../constants/product';

var initialState = {
    productDetails : {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCT:
            return {
                ...state,
                productDetails: {},
            }
        case types.GET_PRODUCT_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                productDetails: data
            }
        default: return state;
    }
}

export default reducer;