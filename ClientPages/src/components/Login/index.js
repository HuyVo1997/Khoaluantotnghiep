import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react'
import Footer from '../Footer';
import Header from '../Header';
import { Link, Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';

const initialValues = {
    username: '',
    password: ''
}

const cookies = new Cookies();

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userID: '',
            name: '',
            email: '',
        }
    }

    showPassowrd = () => {
        var temp = document.getElementById("inputPassword");
        if (temp.type === "password") {
            temp.type = "text";
        }
        else {
            temp.type = "password";
        }
    }

    responseFacebook = (response) => {

        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
        });

        this.props.onLoginFB(this.state.userID, this.state.name, this.state.email)
    }

    onSubmit = (values) => {
        var { LoginSubmit, history } = this.props;
        LoginSubmit(values, history);
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to="/" />
        }
        return (
            <div className="wrapper">
                {/* Header Area Start Here */}
                <Header />
                {/* Header Area End Here */}
                {/* Breadcrumb Area Start Here */}
                <div className="breadcrumb-area">
                    <div className="container">
                        <ol className="breadcrumb breadcrumb-list">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Login</li>
                        </ol>
                    </div>
                </div>
                {/* Breadcrumb Area End Here */}
                {/* Login Page Start Here */}
                <div className="login ptb-80">
                    <div className="container">
                        <h3 className="login-header">Log in to your account </h3>
                        <div className="row">
                            <div className="col-xl-6 col-lg-8 offset-xl-3 offset-lg-2">
                                <div className="login-form">
                                    <Formik initialValues={initialValues}
                                        onSubmit={this.onSubmit}>
                                        {
                                            (formik) => {
                                                return (
                                                    <Form>
                                                        <div>
                                                            <Field name="username">
                                                                {
                                                                    (props) => {
                                                                        const { field, meta } = props;
                                                                        return (
                                                                            <div className="form-group row">
                                                                                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                                                                <div className="col-sm-7">
                                                                                    <input type="email"
                                                                                        className="form-control"
                                                                                        id="email"
                                                                                        placeholder="Email"
                                                                                        autoFocus
                                                                                        {...field}
                                                                                        required />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                            </Field>
                                                        </div>

                                                        <div>
                                                            <Field name="password">
                                                                {
                                                                    (props) => {
                                                                        const { field, meta } = props;
                                                                        return (
                                                                            <div className="form-group row">
                                                                                <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                                                                                <div className="col-sm-7">
                                                                                    <input type="password"
                                                                                        className="form-control"
                                                                                        id="inputPassword"
                                                                                        placeholder="Password"
                                                                                        {...field}
                                                                                        required />
                                                                                    <button className="btn show-btn" type="button" onClick={this.showPassowrd}>Show</button>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                            </Field>
                                                        </div>
                                                        <div className="login-details text-center mb-25">
                                                            <a href="forgot-password.html">Forgot your password? </a>
                                                            <button type="submit"
                                                                className="login-btn">Sign in</button>
                                                            <br />
                                                            <br />
                                                            {/* <Link to="#" class="fb btn" style={{ backgroundColor: "#3B5998", color: "white" }}>
                                                                <i class="fa fa-facebook fa-fw"></i> Login with Facebook
                                                            </Link> */}
                                                            <FacebookLogin
                                                                appId="1063821970730711"
                                                                fields="name,email,picture"
                                                                onClick={this.componentClicked}
                                                                callback={this.responseFacebook}
                                                                cssClass="fb btn"
                                                                icon="fa fa-facebook fa-fw" />
                                                        </div>
                                                        <div className="login-footer text-center">
                                                            <p>No account? <Link to="/register">Create one here</Link></p>
                                                        </div>
                                                    </Form>
                                                )
                                            }
                                        }
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Login Page End Here */}
                {/* Footer Area Start Here */}
                <Footer />
                {/* Footer Area End Here */}
            </div>
        )
    }
}

export default Login
