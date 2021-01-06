import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Footer'
import Header from '../Header'

class OrderDetails extends Component {


    formatMoney = (value) => {
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    Total = (items) => {

        var result = 0;

        for (var i = 0; i < items.length; i++) {
            result += items[i].price * items[i].quantity;
        }

        return result;
    }

    showItems = (ListOrderDetails) => {
        var result = null;

        if (ListOrderDetails.length > 0) {

            result = ListOrderDetails.map((product, index) => {
                return (
                    <tr key={index}>
                        <td className="product-thumbnail">
                            <a href="#"><img src={product.images[0].url} alt="cart-image" /></a>
                        </td>
                        <td className="product-name"><Link to={`/product-details/${product.productID}`}>{product.name}</Link></td>
                        <td className="product-price"><span className="amount">${product.price}</span></td>
                        <td className="product-quantity"><input type="number" value={product.quantity} disabled /></td>
                        <td className="product-subtotal">${product.price * product.quantity}</td>
                    </tr>
                )
            })
        }

        return result;
    }

    render() {

        var { ListOrderDetails } = this.props;

        return (
            <div className="wrapper">
                <Header />
                {/* Breadcrumb Area Start Here */}
                <div className="breadcrumb-area">
                    <div className="container">
                        <ol className="breadcrumb breadcrumb-list">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item active">Order Details</li>
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
                                <form action="#">
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ListOrderDetails ? this.showItems(ListOrderDetails) : <tr style={{ display: "none" }}></tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Table Content Start */}
                                    <div className="row">
                                        {/* Cart Button Start */}
                                        <div className="col-md-8 col-sm-12">
                                            <div className="buttons-cart">
                                                <Link to="/account">Return</Link>
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
                                                            <td>
                                                                <strong><span className="amount">${ListOrderDetails ? this.formatMoney(this.Total(ListOrderDetails)) : 0}</span></strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
                <Footer />
            </div>
        )
    }
}

export default OrderDetails;