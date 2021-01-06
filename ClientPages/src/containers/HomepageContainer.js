import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomePageActions from '../actions/homepage';
import * as OrderDetailsActions from '../actions/orderdetails';
import * as ShopActions from '../actions/shop';
import HomePage from '../components/Homepage';

class HomepageContainer extends Component {

    componentDidMount() {
        var { HomePageActions, OrderDetailsActions } = this.props;
        var { fetchProductList } = HomePageActions;
        var { getAllDetails } = OrderDetailsActions;
        fetchProductList();
        getAllDetails();
    }

    render() {
        const { listProduct, TopProduct, ShopActions } = this.props;
        return (
            <div>
                <HomePage listProduct={listProduct}
                          topProduct = {TopProduct}
                          ShopActions = {ShopActions} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listProduct: state.homepage.listProduct,
        TopProduct : state.topproduct.ListTopProduct,
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        HomePageActions: bindActionCreators(HomePageActions, dispatch),
        OrderDetailsActions : bindActionCreators(OrderDetailsActions, dispatch),
        ShopActions: bindActionCreators(ShopActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProp)(HomepageContainer);
