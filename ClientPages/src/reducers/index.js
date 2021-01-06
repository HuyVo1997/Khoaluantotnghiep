import { combineReducers } from "redux";
import address from './address';
import cart from './cart';
import coupon from './coupon';
import filter from './filter';
import homepage from './homepage';
import loading from './loading';
import login from './login';
import order from './order';
import orderdetails from './orderdetails';
import product from './product';
import review from './review';
import shop from './shop';
import sort from './sort';
import token from './token';
import promotion from './promotion';
import topproduct from './topproduct';
import recommend from './recommend';

const rootReducer = combineReducers({
    login,
    loading,
    token,
    homepage,
    product,
    shop,
    cart,
    sort,
    filter,
    order,
    orderdetails,
    review,
    address,
    coupon,
    promotion,
    topproduct,
    recommend
})

export default rootReducer;