import * as types from '../constants/orders';

export const onGetListOrder = () => {
    return {
        type : types.GET_LIST_ORDER
    }
}

export const onGetListOrderSuccess = (data) => {
    return {
        type : types.GET_LIST_ORDER_SUCCESS,
        payload : {
            data
        }
    }
}

export const updateOrder = (orderID, orderDTO) => {
    return {
        type : types.UPDATE_ORDER,
        payload : {
            orderID,
            orderDTO
        }
    }
}

export const updateOrderSuccess = (data) => {
    return {
        type : types.UPDATE_ORDER_SUCCESS,
        payload : {
            data
        }
    }
}

export const onDeleteOrder = (orderID) => {
    return {
        type : types.DELETE_ORDER,
        payload : {
            orderID
        }
    }
}