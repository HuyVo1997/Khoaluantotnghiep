import * as types from '../constants/orderdetail';

var intitalState = {
    ListTopProduct: []
}

const reducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.GET_ALL_DETAILS:
            return {
                ...state,
                ListTopProduct: []
            }
        case types.GET_ALL_DETAILS_SUCCESS:

            var { data } = action.payload;

            var ListProduct = [];

            var ListTopProduct = [];

            for (let i = 0; i < data.length; i++) {
                ListProduct.push({
                    productID: data[i].productID,
                    name: data[i].name,
                    price : data[i].price,
                    images : data[i].images
                });
            }

            const result = [];
            const map = new Map();

            for (const item of ListProduct) {
                if (!map.has(item.productID)) {
                    map.set(item.productID, item.name);
                    result.push({
                        productID: item.productID,
                        name: item.name,
                        price : item.price,
                        images : item.images
                    })
                }
            }

            for (let i = 0; i < result.length; i++) {
                let quantity = 0;
                for (let k = 0; k < data.length; k++) {
                    if (data[k].productID === result[i].productID) {
                        quantity += data[k].quantity
                    }
                }
                ListTopProduct.push({
                    productID: result[i].productID,
                    name: result[i].name,
                    quantity: quantity,
                    price : result[i].price,
                    images : result[i].images
                })
            }

            ListTopProduct = ListTopProduct.sort(function (a, b) { return b.quantity - a.quantity }).slice(0, 10);

            return {
                ...state,
                ListTopProduct : [...ListTopProduct]
            }
        default : return state
    }
}

export default reducer;