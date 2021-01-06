import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cart from '../components/Cart';
import * as CartActions from './../actions/cart';
import * as ShopActions from '../actions/shop';
import Cookies from 'universal-cookie';

class CartContainer extends Component {

    onDeleteItem = (id) => {
        var { CartActions } = this.props;
        var { onDeleteItemFromCart, onGetProductFromCart } = CartActions;

        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token !== undefined) {
            onDeleteItemFromCart(id, token.jwt);
        }
        else {
            onDeleteItemFromCart(id, null);
        }

    }

    onChangeQuantity = (cartID, quantity) => {
        var { CartActions } = this.props;
        var { onChangeQuantity } = CartActions;

        const cookies = new Cookies();
        const token = cookies.get('token');

        var updateQuantity = { quantity };

        if (token !== undefined) {
            onChangeQuantity(cartID, updateQuantity, token.jwt);
        } else {
            onChangeQuantity(cartID, quantity, null);
        }
    }

    render() {

        var { cart, CartActions, ShopActions } = this.props;

        var { onGetProductFromCart } = CartActions;

        var { addProductToCart } = ShopActions;

        return (
            <Cart cart={cart}
                onChangeQuantity={this.onChangeQuantity}
                onDeleteItem={this.onDeleteItem}
                onAddProductToCart={addProductToCart}
                onGetProductFromCart={onGetProductFromCart} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.listProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        CartActions: bindActionCreators(CartActions, dispatch),
        ShopActions: bindActionCreators(ShopActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
