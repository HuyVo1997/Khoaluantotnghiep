import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ProductByType extends Component {

    onClick = (product) => {
        var { onAddProductToCart } = this.props;
        onAddProductToCart(product);
    }

    render() {

        var { product, location } = this.props;

        return (
            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                {/* Single Product Start */}
                <div className="single-ponno-product">
                    {/* Product Image Start */}
                    <div className="pro-img">
                        <Link to={`/product-details/${product.productID}`}>
                            <img className="primary-img" src={product.images[0].url} alt="single-product" />
                        </Link>
                        <div className="pro-actions-link">
                            <a href="compare.html" title="Compare">
                                <span className="icon icon-MusicMixer" />
                            </a>
                            <a href="#" data-toggle="modal" data-target="#myModal" title="Quick View">
                                <span className="icon icon-Eye" />
                            </a>
                        </div>
                        <a className="sticker-new " href="wishlist.html">
                            <span className="ti-heart" />
                        </a>
                    </div>
                    {/* Product Image End */}
                    {/* Product Content Start */}
                    <div className="pro-content">
                        <div className="pro-info">
                            <h4>
                                <Link to={`/product-details/${product.productID}`}>{product.name}</Link>
                            </h4>
                            <p>
                                <span className="special-price">${product.price}</span>
                            </p>
                            <div className="product-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                            </div>
                        </div>
                        <div className="pro-add-cart">
                            <Link to={{ pathname: location.pathname, search: location.search }} className={product.quantity <= 0 ? "disabled-link" : ""} title="Add to Cart" onClick={() => this.onClick(product)}>{product.quantity > 0 ? "Add To Cart" : "Sold Out"}</Link>
                        </div>
                    </div>
                    {/* Product Content End */}
                </div>
                {/* Single Product End */}
            </div>
        )
    }
}

export default ProductByType
