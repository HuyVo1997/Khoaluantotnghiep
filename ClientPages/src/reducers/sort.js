import * as types from '../constants/sort';

var initialState = {
    sortBy: 'name',
    value: 1
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            var { sortBy, value } = action.payload;
            console.log(action.payload);
            return {
                ...state,
                sortBy: sortBy,
                value: value
            };
        default: return state;
    }
}

export default reducer;