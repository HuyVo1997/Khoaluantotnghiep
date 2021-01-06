import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductItem extends Component {
    render() {
        const { product, index } = this.props;
        return (
            <div className="single-ponno-product">
                {/* Product Image Start */}
                <div className="pro-img">
                    <Link to={`/product-details/${product.productID}`}>
                        <img className="primary-img" src={product.images[0].url} alt="single-product" />
                    </Link>
                </div>
                {/* Product Image End */}
                {/* Product Content Start */}
                <div className="pro-content">
                    <div className="pro-info">
                        <h4><Link to={`/product-details/${product.productID}`}>{product.name}</Link></h4>
                        <p><span className="special-price">${product.price}</span></p>
                    </div>
                </div>
                {/* Product Content End */}
            </div>
        )
    }
}
