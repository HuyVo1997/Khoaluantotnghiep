import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderDetails from '../components/OrderDetails';
import * as OrderDetailsAction from '../actions/orderdetails'
import Cookies from 'universal-cookie';


class OrderDetailsContainer extends Component {

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        var { match, OrderDetailsAction } = this.props
        var { params } = match;
        var { orderID } = params;
        var { getOrderDetails } = OrderDetailsAction;
        getOrderDetails(orderID, token.jwt);
    }

    render() {
        var { ListOrderDetails } = this.props
        return (
            <OrderDetails ListOrderDetails={ListOrderDetails} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ListOrderDetails: state.orderdetails.listOrderDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        OrderDetailsAction: bindActionCreators(OrderDetailsAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsContainer);
