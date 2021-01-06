import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductDetails from '../components/ProductDetails'
import * as ReviewActions from '../actions/review';
import * as ProductActions from '../actions/product';

class ProductContainer extends Component {

    componentDidMount() {
        var { match, ProductActions, ReviewActions } = this.props;
        var productID = match.params.productID;
        var { getProduct } = ProductActions;
        var {onGetReviewsForProduct} = ReviewActions;
        getProduct(productID);
        onGetReviewsForProduct(productID)
    }

    render() {
        var { product, ReviewActions, ListReview } = this.props;
        var { onCreateReview } = ReviewActions;
        return (
            <ProductDetails product = {product}
                onCreateReview = {onCreateReview}
                ListReview = {ListReview} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product.productDetails,
        ListReview : state.review.ListReview
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ProductActions: bindActionCreators(ProductActions, dispatch),
        ReviewActions: bindActionCreators(ReviewActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
