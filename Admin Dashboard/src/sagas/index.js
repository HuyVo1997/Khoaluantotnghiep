import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { onCreateCodeSuccess, onGetAllDiscountSuccess } from '../actions/events';
import { showLoading } from '../actions/loading';
import { GetAllDetailsSuccess, getOrderDetailsSuccess } from '../actions/orderdetails';
import { onGetListOrderSuccess, updateOrderSuccess } from '../actions/orders';
import { addPhoneLaptopSuccess, fetchProductSuccess, onAddBrandSuccess, onAddCategorySuccess, onDeleteBrandSuccess, onDeleteCategoryFailed, onDeleteCategorySuccess, onDeleteProductFail, onDeleteProductSuccess, onGetAllBrandSuccess, onGetAllCategorySuccess, onUpdateProductSuccess } from '../actions/products';
import { onAddPromotionSuccess, onGetAllPromotionSuccess, onGetProductPromotionSuccess } from '../actions/promotion';
import { getAllOrderDetails, getOrderDetails } from '../apis/orderdetails';
import { DeleteOrder, GetListOrder, UpdateOrder } from '../apis/orders';
import { AddBrand, AddCategory, AddLaptop, AddPhone, AddPromotion, CreateCode, DeleteBrand, DeleteCategory, DeleteProduct, DeletePromotion, GetAllCode, GetAllPromotion, getBrandList, getCategoryList, getProductList, GetProductPromotion, UpdateProduct } from '../apis/products';
import * as orderDetailsTypes from '../constants/orderdetails';
import * as orderTypes from '../constants/orders';
import * as productTypes from '../constants/products';

function* fetchProductSaga() {
    const resp = yield call(getProductList);
    const { status, data } = resp;
    yield put(showLoading())
    if (status === 200) {
        yield delay(1000);
        yield put(fetchProductSuccess(data))
        yield put(showLoading())
    }
}

function* getAllBrandSaga() {
    const resp = yield call(getBrandList);
    const { status, data } = resp;
    if (status === 200) {
        yield put(onGetAllBrandSuccess(data))
    }
}

function* getAllCategorySaga() {
    const resp = yield call(getCategoryList);
    const { status, data } = resp;
    if (status === 200) {
        yield put(onGetAllCategorySuccess(data));
    }
}

function* addPhoneLapTopSaga({ payload }) {
    const { phoneData } = payload;
    let resp = null;

    if (phoneData.get('phoneData')) {
        resp = yield call(AddPhone, phoneData, '')
    }

    if (phoneData.get('laptopData')) {
        resp = yield call(AddLaptop, phoneData, '')
    }

    const { status, data } = resp;
    yield put(showLoading())
    if (status === 200) {
        yield delay(1000);
        yield put(addPhoneLaptopSuccess(data));
        yield put(showLoading());
    }
}

function* addBrandSaga({ payload }) {
    const { name } = payload;
    const resp = yield call(AddBrand, name, '');
    const { data, status } = resp;
    yield put(showLoading());
    if (status === 200) {
        yield delay(1000);
        yield put(onAddBrandSuccess(data, name.get('name')));
        yield put(showLoading());
    }
}

function* deleteBrandSaga({ payload }) {
    const { brandID } = payload;
    const resp = yield call(DeleteBrand, brandID, '');
    const { data, status } = resp;

    if (status === 200) {
        yield put(onDeleteBrandSuccess(data.brandID));
    }
}

function* addCategorySaga({ payload }) {
    const { type } = payload;
    const resp = yield call(AddCategory, type, '');
    const { data, status } = resp;
    yield put(showLoading())
    if (status === 200) {
        yield delay(1000);
        yield put(onAddCategorySuccess(data, type.get('type')));
        yield put(showLoading());
    }
}

function* deleteCategorySaga({ payload }) {
    const { typeID } = payload;
    const resp = yield call(DeleteCategory, typeID, '');
    const { data, status } = resp;
    if (status === 200) {
        if (data === "") {
            yield put(onDeleteCategorySuccess(data, typeID));
        } else {
            yield put(onDeleteCategorySuccess(data, null));
        }

    }
    else {
        yield put(onDeleteCategoryFailed(data))
    }
}

function* createCodeSaga({ payload }) {
    const { code } = payload;
    const resp = yield call(CreateCode, code, '');
    const { data, status } = resp;
    if (status === 200) {
        yield put(onCreateCodeSuccess(data, code));
    }
}

function* getAllCodeSaga() {
    const resp = yield call(GetAllCode);
    const { data, status } = resp;
    yield put(showLoading())
    if (status === 200) {
        yield delay(1000);
        yield put(onGetAllDiscountSuccess(data));
        yield put(showLoading());
    }
}

function* addPromotionSaga({ payload }) {
    var { promotionDTO } = payload;
    const resp = yield call(AddPromotion, promotionDTO, '');
    const { data, status } = resp;
    if (status === 200) {
        yield put(onAddPromotionSuccess(data));
    }
}

function* getAllPromotionSaga() {
    const resp = yield call(GetAllPromotion);
    const { data, status } = resp;
    if (status === 200) {
        yield put(onGetAllPromotionSuccess(data));
    }
}

function* getAllProductPromotionSaga() {
    const resp = yield call(GetProductPromotion);
    const { data, status } = resp;
    if (status === 200) {
        yield put(onGetProductPromotionSuccess(data));
    }
}

function* getListOrderSaga() {
    const resp = yield call(GetListOrder);
    const { data, status } = resp;
    yield put(showLoading())
    if (status === 200) {
        yield delay(1000);
        yield put(onGetListOrderSuccess(data));
        yield put(showLoading())
    }
}

function* getOrderDetailsSaga({ payload }) {
    var { orderID } = payload;
    yield put(showLoading())
    const resp = yield call(getOrderDetails, orderID);
    const { data, status } = resp;
    if (status === 200) {
        yield delay(1000);
        yield put(getOrderDetailsSuccess(data));
        yield put(showLoading());
    }
}

function* updateOrderSaga({ payload }) {
    const { orderID, orderDTO } = payload;
    yield put(showLoading())
    const resp = yield call(UpdateOrder, orderID, orderDTO);
    const { data, status } = resp;
    if (status === 200) {
        yield delay(1000);
        yield put(updateOrderSuccess({ orderID, orderDTO }));
        yield put(showLoading());
    }
}

function* deleteOrderSaga({ payload }) {
    const { orderID } = payload;
    const resp = yield call(DeleteOrder, orderID);
}

function* getAllOrderDetailsSaga() {
    const resp = yield call(getAllOrderDetails);
    const { data, status } = resp;
    if (status === 200) {
        yield put(GetAllDetailsSuccess(data));
    }
}

function* deletePromotion({ payload }) {
    var { promotionID } = payload;
    const resp = yield call(DeletePromotion, promotionID, '');
}

function* updateProductSaga({ payload }) {
    var { productID, productDTO } = payload;
    yield put(showLoading());
    const resp = yield call(UpdateProduct, productID, productDTO);
    var { status } = resp;
    if (status === 200) {
        yield delay(1000);
        yield put(onUpdateProductSuccess({ productID, productDTO }));
        yield put(showLoading());
    }
}

function* deleteProductSaga({ payload }) {
    var { productID } = payload;
    yield put(showLoading());
    const resp = yield call(getAllOrderDetails);
    var { data, status } = resp;
    if (status === 200) {
        yield delay(1000);
        const checkProductExists = data.filter(product => product.productID === productID);
        if (checkProductExists.length > 0) {
            yield put(onDeleteProductFail());
        }
        else {
            const respDeleteProduct = yield call(DeleteProduct, productID);
            if (respDeleteProduct.status === 200) {
                yield put(onDeleteProductSuccess(productID));
            }
        }
        yield put(showLoading());
    }
}

function* rootSaga() {
    yield takeEvery(productTypes.GET_ALL_PRODUCT, fetchProductSaga);
    yield takeEvery(productTypes.GET_ALL_BRAND, getAllBrandSaga);
    yield takeEvery(productTypes.GET_ALL_CATEGORY, getAllCategorySaga);
    yield takeEvery(productTypes.ADD_PHONE_LAPTOP, addPhoneLapTopSaga);
    yield takeEvery(productTypes.ADD_BRAND, addBrandSaga);
    yield takeEvery(productTypes.DELETE_BRAND, deleteBrandSaga);
    yield takeEvery(productTypes.ADD_CATEGORY, addCategorySaga);
    yield takeEvery(productTypes.DELETE_CATEGORY, deleteCategorySaga)
    yield takeEvery(productTypes.CREATE_CODE, createCodeSaga);
    yield takeEvery(productTypes.GET_ALL_CODE, getAllCodeSaga);
    yield takeEvery(productTypes.ADD_PROMOTION, addPromotionSaga);
    yield takeEvery(productTypes.GET_ALL_PROMOTION, getAllPromotionSaga);
    yield takeEvery(productTypes.GET_ALL_PRODUCT_PROMOTION, getAllProductPromotionSaga);
    yield takeEvery(orderTypes.GET_LIST_ORDER, getListOrderSaga);
    yield takeEvery(orderDetailsTypes.GET_ORDER_DETAILS, getOrderDetailsSaga);
    yield takeEvery(orderTypes.UPDATE_ORDER, updateOrderSaga);
    yield takeEvery(orderTypes.DELETE_ORDER, deleteOrderSaga);
    yield takeEvery(orderDetailsTypes.GET_ALL_DETAILS, getAllOrderDetailsSaga);
    yield takeEvery(productTypes.DELETE_PROMOTION, deletePromotion);
    yield takeEvery(productTypes.UPDATE_PRODUCT, updateProductSaga);
    yield takeEvery(productTypes.DELETE_PRODUCT, deleteProductSaga);
}

export default rootSaga;