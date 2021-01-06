import { combineReducers } from "redux";
import sidebarShow from './sidebarShow';
import products from './products';
import brands from './brands';
import categories from './categories';
import discount from './discount';
import promotion from './promotion'
import productPromotion from './productPromotion';
import orders from './orders';
import showLoading from './loading';
import orderdetails from './orderdetails';
import percentDiscount from './percentDiscount';
import productByDetails from './productByDetails';

const rootReducer = combineReducers({
    showLoading,
    sidebarShow,
    products,
    brands,
    categories,
    discount,
    promotion,
    productPromotion,
    orders,
    orderdetails,
    percentDiscount,
    productByDetails
})

export default rootReducer;