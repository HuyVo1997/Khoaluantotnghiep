import * as types from '../constants/seachAddess'

export const onSearchAddress = (address) => {
    return {
        type : types.SEARCH_ADDRESS,
        payload : {
            address
        }
    }
}

export const onSearchAddressSuccess = (data) => {
    return {
        type : types.SEARCH_ADDRESS_SUCCESS,
        payload : {
            data
        }
    }
}