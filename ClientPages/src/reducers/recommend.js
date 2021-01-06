import * as types from '../constants/recommend';

var intitalState = {
    ListRecommendProduct: []
}

const reducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.GET_PRODUDCT_RECOMMEND:
            return {
                ...state,
                ListRecommendProduct: []
            }
        case types.GET_PRODUDCT_RECOMMEND_SUCCESS:

            var { data } = action.payload;

            var ListProduct = [];

            var ListRecommendProduct = [];

            for (let i = 0; i < data.length; i++) {
                if(data[i].rating > 0){
                    ListProduct.push({
                        productID: data[i].product.productID,
                        name: data[i].product.name,
                        price : data[i].product.price,
                        images : data[i].product.images,
                        quantity : data[i].product.quantity,
                        rating : data[i].rating
                    });
                }
            }

            ListRecommendProduct = ListProduct.sort(function (a, b) { return b.rating - a.rating }).slice(0, 4);

            return {
                ...state,
                ListRecommendProduct : [...ListRecommendProduct]
            }
        default : return state
    }
}

export default reducer;