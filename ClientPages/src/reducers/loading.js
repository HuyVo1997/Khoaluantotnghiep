import { showLoading } from '../actions/loading';
import * as types from '../constants/loading';

var initialState = {
    showLoading : false,
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case types.SHOW_LOADING:
            return {
                ...state,
                showLoading : !state.showLoading
            }
        default : return state;
    }
}

export default reducer;