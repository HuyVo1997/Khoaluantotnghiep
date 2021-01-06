import * as types from '../constants/sort';

export const onSort = (sortBy, value) => {
    return {
        type: types.SORT,
        payload: {
            sortBy,
            value
        }
    }
}