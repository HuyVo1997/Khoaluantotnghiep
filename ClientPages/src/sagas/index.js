import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { changeQuantitySuccess, onDeleteItemFromCartSuccess, onGetProductFromCartSuccess } from '../actions/cart';
import { onGetAllDiscountSuccess, SubmitCouponFailed, SubmitCouponSuccess } from '../actions/coupon';
import { fetchProductListFail, fetchProductListSuccess } from '../actions/homepage';
import { showLoading } from '../actions/loading';
import { loginFail, loginSuccess } from '../actions/login';
import { getOrderByUserSuccess } from '../actions/order';
import { GetAllDetailsSuccess, getOrderDetailsSuccess } from '../actions/orderdetails';
import { getProductSuccess } from '../actions/product';
import { onGetPromotionActiveSuccess } from '../actions/promotion';
import { onCreateReviewSuccess, onGetReviewsSuccess } from '../actions/review';
import { addProductToCartSuccess, getProductsByTypeSuccess } from '../actions/shop';
import { AddProductToCart, DeleteProductFromCart, getProductFromCart, UpdateQuantity } from '../apis/cart';
import { GetAllCode, GetUsedCodeByUser } from '../apis/coupon';
import { Login, LoginFacebook } from '../apis/login';
import { CreateOrder, getOrderByUser } from '../apis/order';
import { getAllOrderDetails, getOrderDetails } from '../apis/orderdetails';
import { getProduct } from '../apis/product';
import { GetAllPromotion } from '../apis/promotion';
import { addReviewForProduct, getReviewsForProduct } from '../apis/review';
import { getProductListByType } from '../apis/shop';
import * as cartActions from '../constants/cart';
import * as loginAction from '../constants/login';
import * as orderAction from '../constants/order';
import * as orderDetailAction from '../constants/orderdetail';
import * as productAction from '../constants/product';
import * as promotionAction from '../constants/promotion';
import * as reviewAction from '../constants/review';
import * as shopAction from '../constants/shop';
import { onSearchAddressSuccess } from './../actions/seachAddress';
import { setToken } from './../actions/token';
import { getProductList } from './../apis/homepage';
import * as couponAction from './../constants/coupon';
import * as homeAction from './../constants/homepage';
import * as addressAction from './../constants/seachAddess';
import { onGetRecommendProduct } from '../apis/recommend';
import * as recommendAction from '../constants/recommend';
import { getRecommendProductSuccess } from '../actions/recommend';


function* fetchDataSaga() {
    yield put(showLoading());
    const resp = yield call(getProductList);
    const { status, data } = resp;
    if (status === 200) {
        yield delay(1000);
        yield put(fetchProductListSuccess(data));
        yield put(showLoading());
    }
    else {
        yield put(fetchProductListFail(data));
    }
}

function* getProductSaga({ payload }) {
    var { id } = payload;
    yield put(showLoading());
    const resp = yield call(getProduct, id);
    const { status, data } = resp;
    if (status === 200) {
        yield delay(1000);
        yield put(getProductSuccess(data));
        yield put(showLoading());
    }
}

function* getProductByTypeSaga({ payload }) {
    yield put(showLoading());
    var { brand, type } = payload;
    const resp = yield call(getProductListByType, brand, type);
    const { status, data } = resp;
    if (status === 200) {
        yield delay(1000);
        yield put(getProductsByTypeSuccess(data));
        yield put(showLoading());
    }
}

function* addProductToCartSaga({ payload }) {

    var { product, jwt } = payload;

    if (jwt != null) {
        yield put(showLoading());
        const resp = yield call(AddProductToCart, product, jwt);

        var { status, config } = resp;
        if (status === 200 || status === 201) {
            yield delay(1000);
            yield put(addProductToCartSuccess(JSON.parse(config.data), jwt))
            yield put(showLoading());
        }

    }
    else {
        yield put(addProductToCartSuccess(product, jwt))
    }
}

function* getProductFromCartSaga({ payload }) {
    var { user, jwt } = payload;
    if (user !== null && jwt !== null) {
        yield put(showLoading());
        const resp = yield call(getProductFromCart, user, jwt);
        var { data, status } = resp;
        if (status === 200) {
            yield delay(1000);
            yield put(onGetProductFromCartSuccess(data));
            yield put(showLoading());
        }
    }
    else {
        yield put(onGetProductFromCartSuccess(null));
    }
}

function* deleteItemFromCartSaga({ payload }) {
    var { cartID, jwt } = payload;

    if (jwt != null) {
        const resp = yield call(DeleteProductFromCart, cartID, jwt);
        const { status } = resp;
        if (status === 200) {
            yield put(showLoading());
            yield put(onDeleteItemFromCartSuccess(cartID, jwt));
            yield delay(1000);
            yield put(showLoading());
        }
    }
    else {
        yield put(onDeleteItemFromCartSuccess(cartID, null));
    }
}

function* changeQuantitySaga({ payload }) {
    var { cartID, quantity, jwt } = payload;
    if (jwt != null) {
        yield delay(1000);
        yield put(showLoading())
        const resp = yield call(UpdateQuantity, cartID, quantity, jwt);
        const { status } = resp;
        if (status === 200) {
            yield put(changeQuantitySuccess(cartID, quantity.quantity, jwt))
        }
        yield delay(1000);
        yield put(showLoading());
    }
    else {
        yield put(changeQuantitySuccess(cartID, quantity, null));
    }
}

function* createOrderSaga({ payload }) {
    var { order, jwt } = payload;
    if (jwt != null) {
        yield put(showLoading());
        const resp = yield call(CreateOrder, order, jwt);
        yield delay(1000);
        yield put(showLoading());
    }
}

function* getOrderByUserSaga({ payload }) {
    var { user, jwt } = payload;
    if (jwt != null) {
        yield put(showLoading())
        const resp = yield call(getOrderByUser, user, jwt);
        const { data, status } = resp;
        if (status === 200) {
            yield delay(1000);
            yield put(getOrderByUserSuccess(data));
            yield put(showLoading())
        }
    }
}

function* getOrderDetailsSaga({ payload }) {
    var { orderID, jwt } = payload;
    if (orderID !== undefined && jwt !== null) {
        const resp = yield call(getOrderDetails, orderID, jwt);
        const { data, status } = resp;
        if (status === 200) {
            yield put(getOrderDetailsSuccess(data));
        }
    }
}

function* addReviewForProductSaga({ payload }) {
    var { review, jwt } = payload;
    if (jwt != null) {
        const resp = yield call(addReviewForProduct, review, jwt);
        const { data, status } = resp;
        if (status === 200 || status === 201) {
            yield put(showLoading());
            yield put(onCreateReviewSuccess(review));
            yield delay(1000);
            yield put(showLoading());
        }
    }
}

function* getReviewsForProductSaga({ payload }) {
    var { productID } = payload;
    const resp = yield call(getReviewsForProduct, productID);
    const { data, status } = resp;
    if (status === 200) {
        yield put(onGetReviewsSuccess(data));
    }
}

function* getAddressFromUserSaga({ payload }) {
    var { address } = payload;
    yield put(onSearchAddressSuccess(address));
}

function* loginSaga({ payload }) {
    try {
        var { user, history } = payload;
        yield put(showLoading());
        const resp = yield call(Login, user);
        const { data, status } = resp;
        if (status === 200) {
            yield put(setToken(user.username, data, null));
            yield delay(1000);
            yield put(showLoading());
            history.goBack();
            yield put(loginSuccess("Đăng Nhập Thành Công"));
        }
    } catch (err) {
        var error = { message: "Sai Tên Đăng Nhập Hoặc Mật Khẩu" }
        yield put(loginFail(error));
    }
}

function* loginFaceBookSaga({ payload }) {
    var { userID, name, email } = payload;
    const resp = yield call(LoginFacebook, {
        userID: userID,
        name: name,
        email: email
    });
    const { data, status } = resp;
    if (status === 200) {
        yield put(setToken(name, data, email));
    }
}

function* getAllCodeSaga() {
    const resp = yield call(GetAllCode);
    const { data, status } = resp;
    if (status === 200) {
        yield put(onGetAllDiscountSuccess(data));
    }
}

function* submitCoupon({ payload }) {
    var { Coupon, email } = payload;
    var ListCoupon = [];
    var discount = 0;
    var discountID = '';
    var resp = null;

    yield put(showLoading());

    const respAllCode = yield call(GetAllCode);

    const { data, status } = respAllCode;

    if (status === 200) {

        ListCoupon = data;

        if (ListCoupon.length > 0) {

            for (let i = 0; i < ListCoupon.length; i++) {
                if (ListCoupon[i].code === Coupon && ListCoupon[i].status === 1) {
                    resp = yield call(GetUsedCodeByUser, email, ListCoupon[i].discountID)
                }
            }

            if (resp !== null) {

                if (resp.data !== "") {
                    discount = 0;
                    yield delay(1000);
                    yield put(SubmitCouponFailed('Mã Giảm Giá Chỉ Áp Dụng 1 Lần Duy Nhất'));
                    yield put(showLoading());
                }

                if (resp.data === "") {
                    for (let i = 0; i < ListCoupon.length; i++) {
                        if (ListCoupon[i].code === Coupon && ListCoupon[i].status === 1) {
                            discountID = ListCoupon[i].discountID;
                            discount = ListCoupon[i].percent;
                            break;
                        }
                    }
                }

                if (discount !== 0) {
                    yield delay(1000);
                    yield put(SubmitCouponSuccess({
                        discountID: discountID,
                        discount: discount
                    }));
                    yield put(showLoading());
                }
            }

            if (resp === null) {
                yield delay(1000);
                yield put(SubmitCouponFailed('Mã Giảm Giá Không Có Hiệu Lực'));
                yield put(showLoading());
            }
        }
    }
}

function* getPromotionActiveSaga() {
    const resp = yield call(GetAllPromotion);
    var { data, status } = resp;
    if (status === 200) {
        data = data.filter(values => values.status === 1);
        if (data !== null) {
            yield put(onGetPromotionActiveSuccess(data));
        }
    }
}

function* getAllOrderDetailsSaga() {
    const resp = yield call(getAllOrderDetails);
    const { data, status } = resp;
    if (status === 200) {
        yield put(GetAllDetailsSuccess(data));
    }
}

function* getRecommendProductSaga({ payload }) {
    var { email, jwt } = payload;
    const resp = yield call(onGetRecommendProduct, email, jwt);
    var {data,status} = resp;
    if(status === 200){
        yield put(getRecommendProductSuccess(data));
    }
}

function* rootSaga() {
    yield takeEvery(homeAction.FETCH_DATA, fetchDataSaga);
    yield takeEvery(productAction.GET_PRODUCT, getProductSaga);
    yield takeEvery(shopAction.GET_PRODUCTS_BY_TYPE, getProductByTypeSaga);
    yield takeEvery(shopAction.ADD_PRODUCT_TO_CART, addProductToCartSaga);
    yield takeEvery(cartActions.GET_PRODUCT_FROM_CART, getProductFromCartSaga);
    yield takeEvery(cartActions.DELETE_ITEM_FROM_CART, deleteItemFromCartSaga);
    yield takeLatest(cartActions.CHANGE_QUANTITY, changeQuantitySaga);
    yield takeEvery(orderAction.CREATE_ORDER, createOrderSaga);
    yield takeEvery(orderAction.GET_ORDERID, getOrderByUserSaga);
    yield takeEvery(orderDetailAction.GET_ORDER_DETAILS, getOrderDetailsSaga);
    yield takeEvery(reviewAction.CREATE_REVIEW, addReviewForProductSaga);
    yield takeEvery(reviewAction.GET_REVIEWS, getReviewsForProductSaga);
    yield takeEvery(addressAction.SEARCH_ADDRESS, getAddressFromUserSaga);
    yield takeEvery(loginAction.LOGIN, loginSaga);
    yield takeEvery(loginAction.LOGIN_FACEBOOK, loginFaceBookSaga);
    yield takeEvery(couponAction.GET_ALL_CODE, getAllCodeSaga);
    yield takeEvery(couponAction.SUBMIT_COUPON, submitCoupon);
    yield takeEvery(promotionAction.GET_PROMOTION_ACTIVE, getPromotionActiveSaga);
    yield takeEvery(orderDetailAction.GET_ALL_DETAILS, getAllOrderDetailsSaga);
    yield takeEvery(recommendAction.GET_PRODUDCT_RECOMMEND, getRecommendProductSaga);
}


export default rootSaga;