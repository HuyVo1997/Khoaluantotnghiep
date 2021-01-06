import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from '../components/Login'
import * as formActions from '../actions/login';
import { withRouter } from 'react-router-dom'

class LoginPageContainer extends Component {
    render() {

        var { history } = this.props;

        var { formActions } = this.props;

        var { LoginSubmit, loginFacebook } = formActions;

        return (
            <div>
                <Login LoginSubmit={LoginSubmit}
                    history={history}
                    onLoginFB = {loginFacebook} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        formActions: bindActionCreators(formActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPageContainer))
