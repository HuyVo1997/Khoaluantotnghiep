import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class FeatureProduct extends Component {

    onClick = (product) => {
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

    showTopProduct = (topProduct) => {

        var result = null;

        result = topProduct.map((product, index) => {
            return (<div className="single-ponno-product" key={index}>
                {/* Product Image Start */}
                <div className="pro-img">
                    <Link to={`/product-details/${product.productID}`}>
                        <img className="primary-img" src={product.images[0].url} alt="single-product" />
                        <img className="secondary-img" src={product.images[1].url} alt="single-product" />
                    </Link>
                    <div className="pro-actions-link">
                        <a href="compare.html" title="Compare"><span className="icon icon-MusicMixer" /></a>
                        <a href="#" data-toggle="modal" data-target="#myModal" title="Quick View"><span className="icon icon-Eye" /></a>
                    </div>
                </div>
                {/* Product Image End */}
                {/* Product Content Start */}
                <div className="pro-content">
                    <div className="pro-info">
                        <h4><Link to={`/product-details/${product.productID}`}>{product.name}</Link></h4>
                        <p><span className="special-price">${product.price}</span></p>
                    </div>
                    <div className="pro-add-cart">
                        <Link to="#" className={product.quantity <= 0 ? "disabled-link" : ""} title="Add to Cart" onClick={() => this.onClick(product)}>{product.quantity > 0 ? "Add To Cart" : "Sold Out"}</Link>
                    </div>
                </div>
                {/* Product Content End */}
            </div>)
        })

        return result;
    }

    render() {

        const threeOption = {
            items: 4,
            dots: false,
            loop: true,
            nav: true,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
            navElement: 'div',
            margin: 20
        }

        var { topProduct } = this.props;

        return (
            topProduct.length > 0 ? (<div>
                {/* Featured Product Start Here */}
                <div className="featured-pro pb-80">
                    <div className="container">
                        <div className="main-product-tab-area">
                            {/* Nav tabs */}
                            <ul className="nav tabs-area pro-tabs-area" role="tablist">
                                <li className="nav-item">
                                    <a className="active" data-toggle="tab" href="#best-deal">Hot deal</a>
                                </li>
                            </ul>
                            {/* Tab Contetn Start */}
                            <div className="tab-content">
                                <div id="best-deal" className="tab-pane fade show active">
                                    {/* Best Deal Product Activation Start Here */}
                                    <OwlCarousel className="feature-pro-active" {...threeOption}>
                                        {/* Single Product Start */}
                                        {this.showTopProduct(topProduct)}
                                        {/* Single Product End */}
                                    </OwlCarousel>
                                    {/* Best Deal Product Activation End Here */}
                                </div>
                                {/* #best-deal End Here */}
                            </div>
                            {/* Tab Content End */}
                        </div>
                        {/* main-product-tab-area*/}
                    </div>
                </div>
                {/* Featured Product End Here */}
            </div>) : null
        )
    }
}
export default FeatureProduct;