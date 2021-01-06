import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Footer from '../Footer';
import Header from '../Header';
import CartItems from './CartItems';

const initialValues = {
    products: []
}

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {

        var { cart, onAddProductToCart, onGetProductFromCart } = this.props;

        const cookies = new Cookies();

        const token = cookies.get('token');

        if (token !== undefined) {

            onGetProductFromCart(token.email ? token.email : token.username, token.jwt);

            if (localStorage.getItem('Cart')) {
                initialValues["products"] = cart;
                initialValues["user"] = token.email ? token.email : token.username;

                onAddProductToCart(initialValues, token.jwt);

                localStorage.removeItem('Cart');
            }

            else {
                onGetProductFromCart(token.email ? token.email : token.username, token.jwt);
            }
        }
    }

    showItems = (items) => {
        var result = null;

        if (items.length > 0) {
            result = items.map((item, index) => {
                return (
                    <CartItems key={index}
                        item={item}
                        index={index}
                        onChangeQuantity={this.props.onChangeQuantity}
                        onDeleteItem={this.props.onDeleteItem} />
                )
            })
        }

        return result;
    }

    Total = () => {

        var { cart } = this.props;

        var result = 0;

        for (var i = 0; i < cart.length; i++) {
            result += cart[i].price * cart[i].quantity;
        }

        return result;
    }

    onSubmit = (event) => {
        event.preventDefault();
    }

    render() {

        var { cart } = this.props;

        return (
            <div>
                <Header />
                <div>
                    {/* Breadcrumb Area Start Here */}
                    <div className="breadcrumb-area">
                        <div className="container">
                            <ol className="breadcrumb breadcrumb-list">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Cart</li>
                            </ol>
                        </div>
                    </div>
                    {/* Breadcrumb Area End Here */}
                    {/* Cart Main Area Start */}
                    <div className="cart-main-area ptb-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    {/* Form Start */}
                                    <form onSubmit={this.onSubmit}>
                                        {/* Table Content Start */}
                                        <div className="table-content table-responsive mb-45">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th className="product-thumbnail">Image</th>
                                                        <th className="product-name">Product</th>
                                                        <th className="product-price">Price</th>
                                                        <th className="product-quantity">Quantity</th>
                                                        <th className="product-subtotal">Total</th>
                                                        <th className="product-remove">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart ? this.showItems(cart) : <tr style={{ display: "none" }}></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* Table Content Start */}
                                        <div className="row">
                                            {/* Cart Button Start */}
                                            <div className="col-md-8 col-sm-12">
                                                <div className="buttons-cart">
                                                    <Link to="#">Continue Shopping</Link>
                                                </div>
                                            </div>
                                            {/* Cart Button Start */}
                                            {/* Cart Totals Start */}
                                            <div className="col-md-4 col-sm-12">
                                                <div className="cart_totals float-md-right text-md-right">
                                                    <h2>Cart Totals</h2>
                                                    <br />
                                                    <table className="float-md-right">
                                                        <tbody>
                                                            <tr className="order-total">
                                                                <th>Total</th>
                                                                <td><span className="amount">${cart ? this.Total() : 0}</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="wc-proceed-to-checkout">
                                                        <Link to={cart.length > 0 ? "/checkout" : "#"}>Proceed to Checkout</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Cart Totals End */}
                                        </div>
                                        {/* Row End */}
                                    </form>
                                    {/* Form End */}
                                </div>
                            </div>
                            {/* Row End */}
                        </div>
                    </div>
                    {/* Cart Main Area End */}
                </div>
                <Footer />
            </div>
        )
    }
}


export default Cart
