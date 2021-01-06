import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import Account from '../components/Account'
import * as OrderActions from '../actions/order';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

class AccountContainer extends Component {

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        var { OrderActions } = this.props;
        var { getOrderByUser } = OrderActions;
        getOrderByUser(token.email ? token.email : token.username, token.jwt);
    }

    render() {
        var { ListOrder } = this.props
        return (
            <div>
                <Account ListOrder={ListOrder} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ListOrder: state.order.listOrder
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OrderActions: bindActionCreators(OrderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
