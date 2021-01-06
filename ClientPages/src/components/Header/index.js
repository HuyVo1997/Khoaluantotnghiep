import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { bindActionCreators } from 'redux'
import * as tokenActions from '../../actions/token';
import * as CartActions from '../../actions/cart';
import * as RecommendActions from '../../actions/recommend';
import Cookies from 'universal-cookie';

class Header extends Component {

    componentDidMount() {

        const cookies = new Cookies();

        const token = cookies.get('token');

        var { tokenActions, CartActions, RecommendActions } = this.props;

        var { onGetProductFromCart } = CartActions;

        var { getRecommendProduct } = RecommendActions;

        var {getToken} = tokenActions;

        getToken();

        if (token !== undefined) {
            onGetProductFromCart(token.email ? token.email : token.username, token.jwt);
            getRecommendProduct(token.email ? token.email : token.username, token.jwt);
        }
        else {
            onGetProductFromCart(null, null);
        }
    }

    showItems = (items) => {
        var result = null;

        if (items.length > 0) {

            result = items.slice(0, 3).map((item, index) => {
                if (index < 2) {
                    return (
                        <div className="single-cart-box" key={index}>
                            <div className="cart-img">
                                <Link to="#">
                                    <img src={item.images[0].url} alt="cart-image" />
                                </Link>
                                <span className="pro-quantity">{item.quantity}X</span>
                            </div>
                            <div className="cart-content">
                                <h6>
                                    <Link to={`/product-details/${item.productID}`}>{item.name} </Link>
                                </h6>
                                <span className="cart-price">${item.price}</span>
                            </div>
                            <a className="del-icone" href="#">
                                <span className="ti-close" />
                            </a>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="single-cart-box" key={index}>
                            <Link to="/cart"><h5 style={{ textAlign: 'center', marginBottom: '20px' }}>More Items</h5></Link>
                        </div>
                    )
                }
            })
        }

        return result;
    }

    Total = (items) => {

        var result = 0;

        for (var i = 0; i < items.length; i++) {
            result += items[i].price * items[i].quantity;
        }

        return result.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    logoutAccount = () => {
        const cookies = new Cookies();

        const token = cookies.get('token');

        if(token !== null){
            cookies.remove('token');
        }
    }

    render() {

        var { cart, user, location } = this.props;

        return (
            <div>
                {/* Header Area Start Here */}
                <header className="header-area">
                    <div className="header-top">
                        <div className="container">
                            <div className="row align-items-center text-center text-md-left">
                                {/* Logo Start */}
                                <div className="col-md-3 col order-1 order-md-1 mb-sm-30">
                                    <div className="logo">
                                        <Link to="/"><img src="img/logo/logo.png" alt="logo-img" /></Link>
                                    </div>
                                </div>
                                {/* Logo End */}
                                {/* Search Box Start Here */}
                                <div className="col-md-6 order-3 order-md-2">
                                    
                                </div>
                                {/* Search Box End Here */}
                                {/* Cart Box Start Here */}
                                <div className="col-md-3 col order-2 order-md-3 mb-sm-30">
                                    <div className="cart-box float-md-right">
                                        <div>
                                            <Popup trigger={<Link to={location ? { pathname: location.pathname, search: location.search } : "#"}>
                                                <span className="total-pro">{cart ? cart.length : 0} items <br /><span>${cart ? this.Total(cart) : 0}</span></span></Link>}
                                                position="bottom right">
                                                <div>
                                                    <ul className="dropdown1 cart-box-width">
                                                        <li>
                                                            {/* Cart Box Start */}
                                                            {cart ? this.showItems(cart) : null}
                                                            {/* Cart Box End */}
                                                            {/* Cart Footer Inner Start */}
                                                            <div className="cart-footer">
                                                                <div className="cart-actions text-center">
                                                                    <Link className="cart-checkout" to="/checkout">Checkout</Link>
                                                                </div>
                                                            </div>
                                                            {/* Cart Footer Inner End */}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Popup>
                                        </div>
                                    </div>
                                </div>
                                {/* Cart Box End Here */}
                            </div>
                        </div>
                    </div>
                    <div className="header-bottom blue-bg header-sticky">
                        <div className="container">
                            <div className="row align-items-center">
                                {/* Menu Area Start Here */}
                                <div className="col-lg-10 d-none d-lg-block">
                                    <nav>
                                        <ul className="header-menu-list">
                                            <li className="active">
                                                <Link to="/">home</Link>
                                            </li>
                                            <li>
                                                <Link className="drop-icon" to="#">Shop</Link>
                                                {/*  Mega-Menu Start */}
                                                <ul className="ht-dropdown megamenu">
                                                    {/* Single Column Start */}
                                                    <li>
                                                        <ul>
                                                            <li className="menu-tile">Phone</li>
                                                            <li>
                                                                <Link to="/shop/Apple?type=Phone">IPhone</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/shop/Samsung?type=Phone">Samsung</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/shop/Oppo?type=Phone">Oppo</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/shop/Xiaomi?type=Phone">Xiaomi</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    {/* Single Column End */}
                                                    {/* Single Column Start */}
                                                    <li>
                                                        <ul>
                                                            <li className="menu-tile">Laptop</li>
                                                            <li>
                                                                <Link to="/shop/Apple?type=Laptop">Apple</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/shop/Dell?type=Laptop">Apple</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/shop/Asus?type=Laptop">Asus</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/shop/HP?type=Laptop">HP</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    {/* Single Column End */}
                                                </ul>
                                                {/* Mega-Menu End */}
                                            </li>
                                            <li><Link to="/cart">Cart</Link></li>
                                            <li><a href="contact.html">contact</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                {/* Menu Area End Here */}
                                {/* Cart Box Start Here */}
                                <div className="col-lg-2">
                                    <Link to="/account" style={{ color: "#FFE000", display: 'inline-block', marginTop: "20px" }}>Hello, {(user === "" || user === undefined) ? "Guest" : user}</Link>
                                    <div className="setting-box float-right">
                                        <ul>
                                            <li>
                                                <Popup trigger={<Link to={location ? { pathname: location.pathname, search: location.search } : "#"}><span className="ti-settings" /></Link>}
                                                    position={"bottom center"}
                                                    arrow={false}>
                                                    <div>
                                                        {/* Currency & Language Selection Start */}
                                                        <ul className="dropdown1 cart-box-width currency-selector">
                                                            <li>
                                                                <h3>My Account </h3>
                                                                <ul>
                                                                    {(user === "" || user === undefined) ? <li><Link to="/register">Register</Link></li> : null}
                                                                    {(user === "" || user === undefined) ? <li><Link to="/login">Login</Link></li> : null}
                                                                    {(user !== "") ? <li><Link to="/account">Account</Link></li> : null}
                                                                    {(user !== "") ? <li><Link to="/logout" onClick={this.logoutAccount}>Log out</Link></li> : null}
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                        {/* Currency & Language Selection End */}
                                                    </div>
                                                </Popup>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Cart Box End Here */}
                            </div>
                            {/* Row End */}
                        </div>
                        {/* Container End */}
                    </div>
                </header>
                {/* Header Area End Here */}
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.listProduct,
        user: state.token.username ? state.token.username : state.token.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenActions: bindActionCreators(tokenActions, dispatch),
        CartActions: bindActionCreators(CartActions, dispatch),
        RecommendActions : bindActionCreators(RecommendActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
