import * as types from '../constants/products';
import { toastSuccess, toastError } from '../helper/toastHelper';

var intitalState = {
    ListCategory: []
}

const reducer = (state = intitalState, action) => {
    var index = -1;
    switch (action.type) {
        case types.GET_ALL_CATEGORY:
            return {
                ...state,
                ListCategory: []
            }
        case types.GET_ALL_CATEGORY_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                ListCategory: data
            }

        case types.ADD_CATEGORY_SUCCESS:
            var { typeID, type } = action.payload;

            var { ListCategory } = state;

            ListCategory.push({
                typeID: typeID,
                type: type
            });

            toastSuccess('Thêm Thành Công');

            return {
                ...state,
                ListCategory: [...ListCategory]
            }

        case types.DELETE_CATEGORY_SUCCESS:
            var { data, typeID } = action.payload;

            var { ListCategory } = state;

            if (data === "") {

                ListCategory.map((category, key) => {
                    if (category.typeID === typeID) {
                        index = key;
                    }
                });

                if (index !== -1) {
                    ListCategory.splice(index, 1);
                }

                toastSuccess("Xóa Thành Công");
            }
            else {
                var error = { message: "Loại Sản Phẩm Có Ràng Buộc Với Sản Phẩm" }
                toastError(error);
            }

            return {
                ...state,
                ListCategory: [...ListCategory]
            }
        default: return state;
    }
}

export default reducer;