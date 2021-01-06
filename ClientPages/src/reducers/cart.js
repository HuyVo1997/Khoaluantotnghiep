import { toastSuccess } from '../helpers/toastHelper';
import * as cartTypes from './../constants/cart';
import * as types from './../constants/shop';

const initialState = {
    listProduct: []
}

function findProductInCart(listProduct, product) {
    var result = -1;
    listProduct.forEach((item, index) => {
        if (item.productID === product.productID) {
            result = index
        }
    });
    return result;
}

const reducer = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case cartTypes.GET_PRODUCT_FROM_CART:
            return {
                ...state,
                listProduct: []
            }
        case cartTypes.GET_PRODUCT_FROM_CART_SUCCESS:
            var { data } = action.payload;
            return {
                ...state,
                listProduct: data ? data : (JSON.parse(localStorage.getItem('Cart')) ? JSON.parse(localStorage.getItem('Cart')) : [])
            }
        case types.ADD_PRODUCT_TO_CART_SUCCESS:
            var { product, quantity, jwt } = action.payload;

            var { listProduct } = state;

            if (jwt == null) {

                index = findProductInCart(listProduct, product);

                if (index !== -1) {
                    listProduct[index].quantity += parseInt(quantity, 10);
                    toastSuccess('Thêm vào giỏ hàng thành công !');
                }
                else {
                    var newCart = {
                        productID: product.productID,
                        name: product.name,
                        images: product.images,
                        price: product.price,
                        quantity: 1
                    }

                    listProduct.push(newCart);

                    toastSuccess('Thêm Vào Giỏ Hàng Thành Công !')
                }

                localStorage.setItem('Cart', JSON.stringify(listProduct));
            }

            if (jwt != null) {

                var { products } = product;

                index = findProductInCart(listProduct, products[0]);

                if (index !== -1) {
                    listProduct[index].quantity += parseInt(quantity, 10);
                    toastSuccess('Thêm vào giỏ hàng thành công !');
                }
                else {
                    var newCart = {
                        productID: products[0].productID,
                        name: products[0].name,
                        images: products[0].images,
                        price: products[0].price,
                        quantity: 1
                    }

                    listProduct.push(newCart);

                    toastSuccess('Thêm Vào Giỏ Hàng Thành Công !')
                }
            }

            return {
                ...state,
                listProduct: [...listProduct]
            };

        case cartTypes.CHANGE_QUANTITY_SUCCESS:
            var { cartID, quantity, jwt } = action.payload;
            
            var { listProduct } = state;

            if (jwt == null) {

                listProduct.forEach((item, value) => {
                    if (item.productID === cartID) {
                        index = value;
                    }
                })
                
                listProduct[index].quantity = parseInt(quantity, 10)
                
                localStorage.setItem('Cart', JSON.stringify(listProduct));

                toastSuccess('Cập Nhật Giỏ Hàng Thành Công !');
            } else {

                listProduct.forEach((item, value) => {
                    if (item.cartID === cartID) {
                        index = value;
                    }
                })
                
                listProduct[index].quantity = parseInt(quantity, 10)

                toastSuccess('Cập Nhật Giỏ Hàng Thành Công !');
            }

            return {
                ...state,
                listProduct : [...listProduct]
            };

        case cartTypes.DELETE_ITEM_FROM_CART_SUCCESS:
            var { id, jwt } = action.payload;

            var { listProduct } = state;

            if (jwt != null) {

                listProduct.forEach((item, value) => {
                    if (item.cartID === id) {
                        index = value;
                    }
                })

                toastSuccess('Xóa Thành Công !');

                listProduct.splice(index, 1);

            }
            else {

                listProduct.forEach((item, value) => {
                    if (item.productID === id) {
                        index = value;
                    }
                })

                toastSuccess('Xóa Thành Công !');

                listProduct.splice(index, 1);

                localStorage.setItem('Cart', JSON.stringify(listProduct));

            }

            return {
                ...state,
                listProduct: [...listProduct]
            }

        default: return state;
    }
}

export default reducer;