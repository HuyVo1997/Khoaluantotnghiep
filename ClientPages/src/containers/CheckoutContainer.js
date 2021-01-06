import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as couponActions from '../actions/coupon';
import * as orderActions from '../actions/order';
import * as promotionActions from '../actions/promotion';
import * as addressActions from '../actions/seachAddress';
import Checkout from './../components/Checkout';

class CheckoutContainer extends Component {

    componentDidMount() {
        var { couponActions, promotionActions } = this.props;
        var { onGetAllDiscount } = couponActions;
        var { onGetPromotionActive } = promotionActions
        onGetAllDiscount();
        onGetPromotionActive();
    }

    render() {

        var { cart, user, history, orderActions, addressActions, coupon, couponActions, promotion } = this.props;

        var { createOrder } = orderActions;

        var { onSearchAddress } = addressActions;

        var { SubmitCoupon } = couponActions;

        return (
            <div>
                <Checkout cart={cart}
                    user={user}
                    history={history}
                    onCreateOrder={createOrder}
                    onSearchAddress={onSearchAddress}
                    onSubmitCoupon={SubmitCoupon}
                    ListCoupon={coupon}
                    Promotion = {promotion} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.token.email ? state.token.email : state.token.username,
        cart: state.cart.listProduct,
        coupon: state.coupon.ListDiscount,
        promotion : state.promotion.ListPromotion
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderActions: bindActionCreators(orderActions, dispatch),
        addressActions: bindActionCreators(addressActions, dispatch),
        couponActions: bindActionCreators(couponActions, dispatch),
        promotionActions: bindActionCreators(promotionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
