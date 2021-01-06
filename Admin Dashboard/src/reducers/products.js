import * as types from '../constants/products';
import { toastError, toastSuccess } from '../helper/toastHelper';

var intitalState = {
    ListProduct: []
}

const reducer = (state = intitalState, action) => {
    var index = -1;
    switch (action.type) {
        case types.GET_ALL_PRODUCT:
            return {
                ...state,
                ListProduct: []
            }
        case types.GET_ALL_PRODUCT_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                ListProduct: data
            }
        case types.ADD_PHONE_LAPTOP_SUCCESS:

            var { data } = action.payload;

            var { ListProduct } = state;

            toastSuccess('Thêm Thành Công')

            return {
                ...state,
                ListProduct: [...ListProduct]
            }

        case types.UPDATE_PRODUCT_SUCCESS:

            var { data } = action.payload;

            var { ListProduct } = state;

            ListProduct.map((product, key) => {
                if (product.productID === data.productID) {
                    index = key;
                }
            })

            if(index !== -1){
                ListProduct[index].name = data.productDTO.name;
                ListProduct[index].quantity = parseInt(data.productDTO.quantity, 10);
                ListProduct[index].price = data.productDTO.price;
                ListProduct[index].description = data.productDTO.description;
                ListProduct[index].brand.name = data.productDTO.brand.name;
                ListProduct[index].typeProduct.type = data.productDTO.typeProduct.type;
            }

            toastSuccess('Cập Nhật Thành Công');

            return {
                ...state,
                ListProduct: [...ListProduct]
            }

        case types.DELETE_PRODUCT_FAIL:

            var { ListProduct } = state;

            var error = { message: "Sản Phẩm Tồn Tại Trong Hóa Đơn Không Thể Xóa" }

            toastError(error);

            return {
                ...state,
                ListProduct: [...ListProduct]
            }

        default: return state;
    }
}

export default reducer;