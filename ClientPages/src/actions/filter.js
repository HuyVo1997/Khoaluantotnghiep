import * as types from '../constants/filter';

export const onFilterProduct = (filterObject) => {
    return {
        type : types.FILTER,
        payload : {
            filterObject
        }
    }
}