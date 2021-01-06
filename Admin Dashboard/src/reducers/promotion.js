import * as types from '../constants/products';
import { toastSuccess, toastError } from '../helper/toastHelper';

var intitalState = {
    ListPromotion: []
}

const reducer = (state = intitalState, action) => {
    var index = -1;
    switch (action.type) {
        case types.GET_ALL_PROMOTION:
            return {
                ...state,
                ListPromotion: []
            }
        case types.GET_ALL_PROMOTION_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                ListPromotion: data
            }

        case types.ADD_PROMOTION_SUCCESS:
            var { brandID, brandName } = action.payload;

            var { ListPromotion } = state;

            ListPromotion.push({
                brandID: brandID,
                name: brandName,
                status: 1
            });

            toastSuccess('Thêm Thành Công');

            return {
                ...state,
                ListPromotion: [...ListPromotion]
            }

        case types.DELETE_BRAND_SUCCESS:
            var { data, brandID } = action.payload;

            var { ListPromotion } = state;

            if (data === "") {

                ListPromotion.map((brand, key) => {
                    if (brand.brandID === brandID) {
                        index = key;
                    }
                });

                if (index !== -1) {
                    ListPromotion.splice(index, 1);
                }

                toastSuccess("Xóa Thành Công");
            }
            else {
                var error = { message: "Thương Hiệu Có Ràng Buộc Với Sản Phẩm" }
                toastError(error);
            }

            return {
                ...state,
                ListPromotion: [...ListPromotion]
            }
        default: return state;
    }
}

export default reducer;