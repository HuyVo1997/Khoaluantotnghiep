import * as types from '../constants/loading';

export const showLoading = () => {
    return {
        type : types.SHOW_LOADING,
    }
}