import * as types from '../constants/products';
import { toastSuccess, toastError } from '../helper/toastHelper';

var intitalState = {
    ListDiscount: []
}

const reducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.GET_ALL_CODE:
            return {
                ...state,
                ListDiscount: []
            }
        case types.GET_ALL_CODE_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                ListDiscount: data
            }
        case types.CREATE_CODE_SUCCESS:
            var { data, code } = action.payload;

            var { ListDiscount } = state;

            ListDiscount.push({
                discountID: data,
                code: code.code,
                percent: parseInt(code.percent, 10),
                limitCode: parseInt(code.limitCode, 10),
                usesCode: 0,
                dateStart: code.dateStart,
                dateEnd: code.dateEnd,
                status: 1
            });

            toastSuccess('Thêm Thành Công');

            return {
                ...state,
                ListDiscount: [...ListDiscount]
            }
        default: return state;
    }
}

export default reducer;