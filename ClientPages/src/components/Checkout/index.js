import $ from 'jquery';
import 'pretty-checkbox';
import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Cookies from 'universal-cookie';
import { Field, Form, Formik } from 'formik';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import Map from '../Map';
import { PayPalButton } from "react-paypal-button-v2";

const dateObj = new Date();

const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dateObj);
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);

let date = (ye + "-" + mo + "-" + da);

const initialValues = {
    user: '',
    name: '',
    address: '',
    city: '',
    state: '',
    status: 0,
    zip: '',
    phone: '',
    total: 0,
    payment: 'COD',
    dateCreate: date,
    products: []
}

var promotionActive = false;

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            coupon: ''
        }
    }

    componentDidMount() {

        $('#showcoupon').on('click', function () {
            $('#checkout_coupon').slideToggle();
        });

        $('#showMap').on('click', function () {
            $('#showAddress').slideToggle();
        });

        $('#cbox').on('click', function () {
            $('#cbox_info').slideToggle();
        });

        $('#ship-box').on('click', function () {
            $('#ship-box-info').slideToggle();
        });
    }

    onChange = (event) => {
        if ($('#address').val() && $('#state').val() && $('#city').val()) {
            const address = $('#address').val() + ", " + ", " + $('#state').val() + $('#city').val();
            this.props.onSearchAddress(address);
        }
    }

    showMap = () => {
        const WrappedMap = withScriptjs(withGoogleMap(Map));

        var result = null;

        result = (<div style={{ width: '86vw', height: '100vh' }}>
            <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp
            &libraries=geometry,drawing,places&key=AIzaSyDjA4fm5T_WsKH-kRyZ2lgTk-PXzFx0Gdo`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
            />
        </div>)

        return result
    }

    formatMoney = (value) => {
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    showItems = (items) => {

        var result = null;

        if (items.length > 0) {
            result = items.map((item, index) => {
                return (
                    <tr className="cart_item" key={index}>
                        <td style={{ display: 'none' }}>{item.productID}</td>
                        <td className="product-name">
                            {item.name} <span className="product-quantity"> (× {item.quantity}) </span>
                        </td>
                        <td className="product-total">
                            <span className="amount">${this.formatMoney(item.price)}</span>
                        </td>
                    </tr>
                )
            })
        }

        return result;
    }

    SubTotal = (items) => {

        var result = 0;

        for (var i = 0; i < items.length; i++) {
            result += items[i].price * items[i].quantity;
        }

        return result;
    }

    Total = (cart, coupon) => {

        var result = 0;

        result = (this.SubTotal(cart) - (this.SubTotal(cart) * coupon))

        initialValues["total"] = result;

        return result;

    }

    confirmPayment = (values) => {
        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token === undefined) {
            var { history } = this.props;
            history.push("/login");
        }
        else {
            var { onCreateOrder } = this.props;
            onCreateOrder(values, token.jwt);
            var { history } = this.props;
            history.push("/account");
        }
    }

    getValuePayment = () => {
        return $('input[name="radio"]:checked').val();
    }

    onConfirm = (values) => {

        var { cart, user } = this.props;

        values["products"] = cart;

        values["payment"] = this.getValuePayment();
        values["email"] = user;

        const { ListCoupon } = this.props;

        if (ListCoupon.discount > 0) {
            values["discountID"] = ListCoupon.discountID;
        }

        if (document.getElementById("discount") !== null) {
            let value = document.getElementById("discount").textContent;
            values["percent"] = parseInt(value.slice(0, -1), 10);
        }

        console.log(initialValues)

        var { history } = this.props;

        const cookies = new Cookies();
        const token = cookies.get('token');

        if (token === undefined) {
            var { history } = this.props;
            history.push("/login");
        }

        else {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Xác Nhận</h1>
                            <p>Bạn có chắc chắn muốn đặt hàng?</p>
                            <button onClick={() => { this.confirmPayment(values); onClose() }}>OK</button>
                            <button
                                onClick={onClose}
                            >
                                Hủy Bỏ !
                            </button>
                        </div>
                    );
                }
            });
        }
    }

    onConfirm1 = () => {
        var values = {};
        var { cart, user } = this.props;

        values["products"] = cart;
        values["payment"] = this.getValuePayment();
        values["email"] = user;
        values["address"] = $('#address').val();
        values["city"] = $('#city').val();
        values["name"] = $('#name').val();
        values["phone"] = $('#phone').val();
        values["state"] = $('#state').val();
        values["status"] = initialValues.status;
        values["total"] = initialValues.total;
        values["dateCreate"] = initialValues.dateCreate;

        var { ListCoupon } = this.props;

        if (ListCoupon.discount > 0) {
            values["discountID"] = ListCoupon.discountID;
        }

        if (document.getElementById("discount") !== null) {
            let value = document.getElementById("discount").textContent;
            values["percent"] = parseInt(value.slice(0, -1), 10);
        }

        values["zip"] = $('#zip').val();

        this.confirmPayment(values);
    }

    submitCoupon = (event) => {
        event.preventDefault();
        if (promotionActive) {
            alert("Đang áp dụng chương trình khuyến mãi bạn không thể áp dụng mã giảm giá")
        }
        else {
            const cookies = new Cookies();
            const token = cookies.get('token');
            var { onSubmitCoupon } = this.props;
            onSubmitCoupon($('#coupon1').val(), token.email ? token.email : token.username);
        }
    }

    Promotion = (cart) => {
        var result = null;
        promotionActive = false;

        if (this.props.Promotion[0] !== undefined) {
            if (this.Total(cart, 0) > this.props.Promotion[0].totalBill) {
                promotionActive = true;
            }
        }

        return result;
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
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Compare</li>
                            </ol>
                        </div>
                    </div>
                    {/* Breadcrumb Area End Here */}
                    {/* coupon-area start */}
                    <div className="coupon-area pt-80 pb-30">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="coupon-accordion">
                                        {/* Accordion Start */}
                                        <h3>Have a coupon? <span id="showcoupon">Click here to enter your code</span></h3>
                                        <div id="checkout_coupon" className="coupon-checkout-content">
                                            <div className="coupon-info">
                                                <form action="#">
                                                    <p className="checkout-coupon">
                                                        <input type="text" name="coupon" id="coupon1" className="code" placeholder="Coupon code" />
                                                        <input type="submit" onClick={this.submitCoupon} defaultValue="Apply Coupon" />
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                        {/* ACCORDION END */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="coupon-accordion">
                                        {/* Accordion Start */}
                                        <h3>See Address On Map ? <span id="showMap">Click here</span></h3>
                                        <div id="showAddress">
                                            {this.showMap()}
                                        </div>
                                        {/* ACCORDION END */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* coupon-area end */}
                    {/* checkout-area start */}
                    <div className="checkout-area pb-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <Formik initialValues={initialValues}
                                        onSubmit={this.onConfirm}>
                                        {
                                            (formik) => {
                                                return (
                                                    <Form>
                                                        <div className="checkbox-form mb-sm-40">
                                                            <h3>Billing Details</h3>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <Field name="name">
                                                                        {
                                                                            (props) => {
                                                                                const { field } = props;
                                                                                return (
                                                                                    <div className="checkout-form-list mb-sm-30">
                                                                                        <label> Name <span className="required">*</span></label>
                                                                                        <input id="name" type="text" placeholder="Full Name" {...field} required />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Field>
                                                                    <br />
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <Field name="address">
                                                                        {
                                                                            (props) => {
                                                                                const { field } = props;
                                                                                return (
                                                                                    <div className="checkout-form-list mb-sm-30">
                                                                                        <label> Address <span className="required">*</span></label>
                                                                                        <input id="address" type="text"
                                                                                            placeholder="Street address"
                                                                                            {...field}
                                                                                            onBlur={event => this.onChange(event)}
                                                                                            required />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Field>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <Field name="city">
                                                                        {
                                                                            (props) => {
                                                                                const { field } = props;
                                                                                return (
                                                                                    <div className="checkout-form-list mb-30">
                                                                                        <label>Town / City <span className="required">*</span></label>
                                                                                        <input id="city"
                                                                                            {...field}
                                                                                            onBlur={event => this.onChange(event)}
                                                                                            type="text"
                                                                                            placeholder="Town / City" required />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Field>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <Field name="state">
                                                                        {
                                                                            (props) => {
                                                                                const { field } = props;
                                                                                return (
                                                                                    <div className="checkout-form-list mb-30">
                                                                                        <label>State / County <span className="required">*</span></label>
                                                                                        <input
                                                                                            id="state"
                                                                                            {...field}
                                                                                            onBlur={event => this.onChange(event)}
                                                                                            type="text"
                                                                                            required />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Field>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <Field name="zip">
                                                                        {
                                                                            (props) => {
                                                                                const { field } = props;
                                                                                return (
                                                                                    <div className="checkout-form-list mb-30">
                                                                                        <label>Postcode / Zip <span className="required">*</span></label>
                                                                                        <input id="zip" name="zip" type="text" {...field} placeholder="Postcode / Zip" required />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Field>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <Field name="phonedí">
                                                                        {
                                                                            (props) => {
                                                                                const { field } = props;
                                                                                return (
                                                                                    <div className="checkout-form-list mb-30">
                                                                                        <label>Phone <span className="required">*</span></label>
                                                                                        <input id="phone" name="phone"
                                                                                            type="text" {...field}
                                                                                            placeholder="Phone Number" required />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                            <div className="coupon-accordion" style={{ marginTop: "10px" }}>
                                                                <p className="checkout-coupon">
                                                                    <button type="submit" className="confirm" >Confirm</button>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )
                                            }
                                        }
                                    </Formik>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="your-order">
                                        <h3>Your order</h3>
                                        <div className="your-order-table table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th className="product-name">Product</th>
                                                        <th className="product-total">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.showItems(cart)}
                                                </tbody>
                                                <tfoot>
                                                    {this.Promotion(cart)}
                                                    {this.props.ListCoupon.discount > 0 ? <tr className="cart-subtotal">
                                                        <th>Cart Subtotal</th>
                                                        <td><span className="amount">${this.formatMoney(this.SubTotal(cart))}</span></td>
                                                    </tr> : null}
                                                    {promotionActive ? <tr className="cart-subtotal">
                                                        <th>Cart Subtotal</th>
                                                        <td><span className="amount">${this.formatMoney(this.SubTotal(cart))}</span></td>
                                                    </tr> : null}
                                                    {this.props.ListCoupon.discount > 0 ? <tr className="cart-subtotal">
                                                        <th>Coupon</th>
                                                        <td><span className="amount" id="discount">{this.props.ListCoupon.discount}%</span></td>
                                                    </tr> : null}
                                                    {promotionActive ? <tr className="cart-subtotal">
                                                        <th>Coupon</th>
                                                        <td><span className="amount" id="discount">{this.props.Promotion[0].promotionValue}%</span></td>
                                                    </tr> : null}
                                                    <tr className="order-total">
                                                        <th>Order Total</th>
                                                        <td><span className="total amount" id="OrderTotal">${this.props.ListCoupon.discount > 0 ?
                                                            this.formatMoney(this.Total(cart, (this.props.ListCoupon.discount / 100))) :
                                                            ((this.props.Promotion[0] !== undefined && this.props.Promotion[0].promotionValue && promotionActive) > 0 ?
                                                                this.formatMoney(this.Total(cart, (this.props.Promotion[0].promotionValue / 100)))
                                                                : this.formatMoney(this.Total(cart, 0)))}</span>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="payment-method">
                                            <div id="accordion">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <div className="pretty p-default p-round p-thick" style={{ margin: "10px 0 10px 10px" }} >
                                                            <input type="radio" name="radio" data-toggle="collapse" data-target="#collapseOne" aria-controls="collapseOne" defaultChecked value="COD" onClick={this.getValuePayment} />
                                                            <div className="state">
                                                                <label style={{ fontWeight: "600", color: "#333", fontSize: "18px" }}>Cash On Delivery</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingone" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <div className="pretty p-default p-round p-thick" style={{ margin: "10px 0 10px 10px" }} >
                                                            <input type="radio" name="radio" data-toggle="collapse" data-target="#collapseThree" aria-controls="collapseThree" onClick={this.getValuePayment} value="Paypal" />
                                                            <div className="state">
                                                                <label style={{ fontWeight: "600", color: "#333", fontSize: "18px" }}>Paypal</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="collapseThree" className="collapse" aria-labelledby="headingthree" data-parent="#accordion">
                                                        <div className="card-body">
                                                            <PayPalButton
                                                                amount={initialValues.total}
                                                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                                                onSuccess={(details, data) => {
                                                                    alert("Transaction completed by " + details.payer.name.given_name);
                                                                    this.onConfirm1()
                                                                }}
                                                                options={{
                                                                    clientId: "AcntRHuauIjUtIu6zR6HAvhaxghyaXyzAlmzlH-vQwHk2jlySIaxo594aYMalb90HTjYAKtG5Zf5tpZI"
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* checkout-area end */}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Checkout
