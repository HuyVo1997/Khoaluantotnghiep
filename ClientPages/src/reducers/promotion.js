import * as types from '../constants/promotion';

const initialState = {
    ListPromotion : {}
};

const reducer = (state = initialState, action)  => {
    switch (action.type) {
        case types.GET_PROMOTION_ACTIVE_SUCCESS:

            const {data} = action.payload;

            return {
                ...state,
                ListPromotion : data
            };
        default: return state;
    }
}

export default reducer;