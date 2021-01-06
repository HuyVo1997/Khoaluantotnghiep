import * as types from '../constants/orders';

var intitalState = {
    ListOrder: []
}

const reducer = (state = intitalState, action) => {
    var index = -1;
    switch (action.type) {
        case types.GET_LIST_ORDER:
            return {
                ...state,
                ListOrder: []
            }
        case types.GET_LIST_ORDER_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                ListOrder: data
            }
        case types.UPDATE_ORDER_SUCCESS:
            var { data } = action.payload;

            var { orderID, orderDTO } = data;

            var { ListOrder } = state;

            if (orderID !== "") {
                ListOrder.map((order, key) => {
                    if (order.orderID === orderID) {
                        index = key;
                    }
                })
            }

            var order = ListOrder[index];
            order["dateDelivery"] = orderDTO.dateDelivery;
            order["status"] = parseInt(orderDTO.status,10);

            if (index !== -1) {
                ListOrder[index] = order;
            }

            return {
                ...state,
                ListOrder: [...ListOrder]
            }
        default: return state;
    }
}

export default reducer;