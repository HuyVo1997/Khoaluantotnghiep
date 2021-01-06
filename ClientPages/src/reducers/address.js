import * as types from '../constants/seachAddess';

const initialState = '';

const reducer = (state = initialState, action)  => {
    switch (action.type) {
        case types.SEARCH_ADDRESS_SUCCESS:
            return action.payload.data;
        default: return state;
    }
}

export default reducer;