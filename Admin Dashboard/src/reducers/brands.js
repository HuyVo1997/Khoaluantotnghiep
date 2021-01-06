import * as types from '../constants/products';
import { toastSuccess, toastError } from '../helper/toastHelper';

var intitalState = {
    ListBrand: []
}

const reducer = (state = intitalState, action) => {
    var index = -1;
    switch (action.type) {
        case types.GET_ALL_BRAND:
            return {
                ...state,
                ListBrand: []
            }
        case types.GET_ALL_BRAND_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                ListBrand: data
            }

        case types.ADD_BRAND_SUCCESS:
            var { brandID, brandName } = action.payload;

            var { ListBrand } = state;

            ListBrand.push({
                brandID: brandID,
                name: brandName,
                status: 1
            });

            toastSuccess('Thêm Thành Công');

            return {
                ...state,
                ListBrand: [...ListBrand]
            }

        case types.DELETE_BRAND_SUCCESS:
            var { brandID } = action.payload;

            var { ListBrand } = state;

            if (brandID === undefined) {
                ListBrand.map((brand, key) => {
                    if (brand.brandID === brandID) {
                        index = key;
                    }
                });

                if (index !== -1) {
                    ListBrand.splice(index, 1);
                }

                toastSuccess("Xóa Thành Công");
            }

            return {
                ...state,
                ListBrand: [...ListBrand]
            }
        case types.DELETE_BRAND_FAILED:

            var { ListBrand } = state;

            var error = { message: "Thương Hiệu Có Ràng Buộc Với Sản Phẩm" }

            toastError(error);

            return {
                ...state,
                ListBrand: [...ListBrand]
            }
        default: return state;
    }
}

export default reducer;