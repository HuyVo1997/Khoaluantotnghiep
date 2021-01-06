import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import * as ShopActions from '../actions/shop';
import * as SortActions from '../actions/sort';
import * as FilterActions from '../actions/filter';
import Shop from '../components/Shop';
import FilterProduct from '../components/FilterProduct';

class ShopContainer extends Component {

    componentDidMount() {
        var { match, location, ShopActions } = this.props;
        let brand = match.params.brand;
        let params = queryString.parse(location.search)
        var { getProductsByType } = ShopActions;
        getProductsByType(brand, params.type);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.brand !== this.props.match.params.brand) {
            var { match, location, ShopActions } = this.props;
            let brand = match.params.brand;
            let params = queryString.parse(location.search)
            var { getProductsByType } = ShopActions;
            getProductsByType(brand, params.type);
        }
    }

    onAddProductToCart = (product) => {
        const cookies = new Cookies();
        const token = cookies.get('token');

        var { ShopActions } = this.props;
        var { addProductToCart } = ShopActions;

        const initialValues = {
            products: [],
            user: ''
        }

        if (token !== undefined) {
            if (product !== null) {
                product.quantity = 1;
            }

            initialValues["products"].push(product);

            initialValues["user"] = token.email ? token.email : token.username;

            addProductToCart(initialValues, token.jwt);
        }
        else {
            addProductToCart(product, null);
        }
    }

    render() {

        var { productsByType, location, sort, SortActions, FilterActions, filter } = this.props;

        var { onSort } = SortActions;

        var { onFilterProduct } = FilterActions;

        return (
            <Shop productsByType={productsByType}
                onAddProductToCart={this.onAddProductToCart}
                location={location}
                onSort={onSort}
                sort={sort}
                onFilter={onFilterProduct}
                filter={filter} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productsByType: state.shop.productsByType,
        sort: state.sort,
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ShopActions: bindActionCreators(ShopActions, dispatch),
        SortActions: bindActionCreators(SortActions, dispatch),
        FilterActions: bindActionCreators(FilterActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)
