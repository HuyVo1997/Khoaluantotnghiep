import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

export default class Account extends Component {

    showOrder = (ListOrder) => {
        var result = null;

        if (ListOrder.length > 0) {
            result = ListOrder.map((order, index) => {
                return (<tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.dateCreate}</td>
                    <td>{order.status === 0 ? "Pending" : (order.status === 1 ? "Delivered" : "Cancle")}</td>
                    <td>${order.total}</td>
                    <td><Link className="view" to={`/order-details/${order.orderID}`}>view</Link></td>
                </tr>)
            })
        }

        return result
    }

    render() {

        var { ListOrder } = this.props;

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
                            <li className="breadcrumb-item active">account</li>
                        </ol>
                    </div>
                </div>
                {/* Breadcrumb Area End Here */}
                {/* My Account Page Start Here */}
                <div className="my-account white-bg ptb-80">
                    <div className="container">
                        <div className="account-dashboard">
                            <div className="dashboard-upper-info">
                                <div className="row align-items-center no-gutters">
                                    <div className="col-xl-3 col-lg-3 col-md-6">
                                        <div className="d-single-info">
                                            <p className="user-name">Hello <span>yourmail@info</span></p>
                                            <p>(not yourmail@info? <a className="log-out" href="#">Log Out</a>)</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6">
                                        <div className="d-single-info">
                                            <p>Need Support? Customer service.</p>
                                            <p>admin@example.com.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6">
                                        <div className="d-single-info">
                                            <p>E-mail them at </p>
                                            <p>support@example.com</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-2 col-md-6">
                                        <div className="d-single-info text-lg-center">
                                            <Link className="view-cart" to="/cart">view cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2">
                                    {/* Nav tabs */}
                                    <ul className="nav flex-column dashboard-list" role="tablist">
                                        <li> <a className="nav-link active" data-toggle="tab" href="#orders">Orders</a></li>
                                        <li><a className="nav-link" data-toggle="tab" href="#address">Addresses</a></li>
                                        <li><a className="nav-link" data-toggle="tab" href="#account-details">Account details</a></li>
                                        <li><a className="nav-link" href="login.html">logout</a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-10">
                                    {/* Tab panes */}
                                    <div className="tab-content dashboard-content mt-all-40">
                                        <div id="orders" className="tab-pane fade show active">
                                            <h3>Orders</h3>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Order</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                            <th>Total</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ListOrder ? this.showOrder(ListOrder) : <tr style={{ display: "none" }}></tr>}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div id="address" className="tab-pane">
                                            <p>The following addresses will be used on the checkout page by default.</p>
                                            <h4 className="billing-address">Billing address</h4>
                                            <a className="view" href="#">edit</a>
                                            <p>Bayazid Hasan</p>
                                            <p>Bangladesh</p>
                                        </div>
                                        <div id="account-details" className="tab-pane fade">
                                            <h3>Account details </h3>
                                            <div className="register-form login-form clearfix">
                                                <form action="#">
                                                    <div className="form-group row align-items-center">
                                                        <label className="col-lg-3 col-md-4 col-form-label">Social title</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <span className="custom-radio"><input name="id_gender" defaultValue={1} type="radio" /> Mr.</span>
                                                            <span className="custom-radio"><input name="id_gender" defaultValue={1} type="radio" /> Mrs.</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="f-name" className="col-lg-3 col-md-4 col-form-label">First Name</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <input type="text" className="form-control" id="f-name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="l-name" className="col-lg-3 col-md-4 col-form-label">Last Name</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <input type="text" className="form-control" id="l-name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="email" className="col-lg-3 col-md-4 col-form-label">Email address</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <input type="text" className="form-control" id="email" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="inputpassword" className="col-lg-3 col-md-4 col-form-label">Current password</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <input type="password" className="form-control" id="inputpassword" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="newpassword" className="col-lg-3 col-md-4 col-form-label">New password</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <input type="password" className="form-control" id="newpassword" />
                                                            <button className="btn show-btn" type="button">Show</button>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="c-password" className="col-lg-3 col-md-4 col-form-label">Confirm password</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <input type="password" className="form-control" id="c-password" />
                                                            <button className="btn show-btn" type="button">Show</button>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="birth" className="col-lg-3 col-md-4 col-form-label">Birthdate</label>
                                                        <div className="col-lg-6 col-md-8">
                                                            <input type="text" className="form-control" id="birth" placeholder="MM/DD/YYYY" />
                                                        </div>
                                                    </div>
                                                    <div className="form-check row p-0 mt-20">
                                                        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-4">
                                                            <input className="form-check-input" defaultValue="#" id="offer" type="checkbox" />
                                                            <label className="form-check-label" htmlFor="offer">Receive offers from our partners</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-check row p-0 mt-20">
                                                        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-4">
                                                            <input className="form-check-input" defaultValue="#" id="subscribe" type="checkbox" />
                                                            <label className="form-check-label" htmlFor="subscribe">Sign up for our newsletter<br />Subscribe to our newsletters now and stay up-to-date with new collections, the latest lookbooks and exclusive offers..</label>
                                                        </div>
                                                    </div>
                                                    <div className="register-box mt-40">
                                                        <button type="submit" className="return-customer-btn float-right">Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* My Account Page End Here */}
                <Footer />
            </div>
        )
    }
}
