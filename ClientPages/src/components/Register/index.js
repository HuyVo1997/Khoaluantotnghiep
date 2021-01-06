import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'

class Register extends Component {

    showPassowrd = () => {
        var temp = document.getElementById("inputPassword");
        if (temp.type === "password") {
            temp.type = "text";
        }
        else {
            temp.type = "password";
        }
    }

    render() {
        return (
            <div>
                <Header />
                < div className="register-area ptb-80" >
                    <div className="container">
                        <h3 className="login-header">Create an account </h3>
                        <div className="row">
                            <div className="offset-xl-1 col-xl-10">
                                <div className="register-form login-form clearfix">
                                    <form action="#">
                                        <p>Already have an account? <Link to="/login">Log in instead!</Link></p>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-lg-3 col-md-3 col-form-label">Email</label>
                                            <div className="col-lg-6 col-md-6">
                                                <input type="text" className="form-control" id="email" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword" className="col-lg-3 col-md-3 col-form-label">Password</label>
                                            <div className="col-lg-6 col-md-6">
                                                <input type="password" className="form-control" id="inputPassword" />
                                                <button className="btn show-btn" type="button" onClick={this.showPassowrd}>Show</button>
                                            </div>
                                        </div>
                                        <div className="form-check row p-0 mt-20">

                                        </div>
                                        <div className="mt-40">
                                            <button type="submit" className="login-btn float-right">Register</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <Footer />
            </div>
        )
    }
}

export default Register