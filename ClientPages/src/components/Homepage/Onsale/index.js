import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';

class Onsale extends Component {
    render() {
        const dualOption = {
            items: 1,
            loop: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true
        }
        return (
            <div>
                {/* Banner & OnSale Area Start Here */}
                <div className="banner-onslae pb-80">
                    <div className="container">
                        <div className="row">
                            {/* Onsale Banner Start Here */}
                            <div className="col-xl-8 mb-lg-40">
                                <div className="onsale-banner">
                                    <div className="single-banner img-big zoom">
                                        <a href="shop.html"><img src="img/banner/b5.jpg" alt="banner-img" /></a>
                                    </div>
                                    <div className="single-banner img-small zoom">
                                        <a href="shop.html"><img src="img/banner/b6.jpg" alt="banner-img" /></a>
                                    </div>
                                </div>
                            </div>
                            {/* Onsale Banner End Here */}
                            {/* Onsale Product  Start Here */}
                            <div className="col-xl-4">
                                <div className="pro-style-changer">
                                    <h5 className="e-header mb-35">On Sale</h5>
                                    <OwlCarousel className="onsale-active" {...dualOption}>
                                        {/* Dual Pro Start Here */}
                                        <div className="dual-pro">
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <a href="product-details.html">
                                                        <img className="primary-img" src="img/products/p1.jpg" alt="single-product" />
                                                    </a>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><a href="product-details.html">Razra solo Pro</a></h4>
                                                        <p><span className="special-price">$140.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <span className="quantity-pro">(200+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <a href="product-details.html">
                                                        <img className="primary-img" src="img/products/p3.jpg" alt="single-product" />
                                                    </a>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><a href="product-details.html">Finibus Bonorum</a></h4>
                                                        <p><span className="special-price">$10.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                            <span className="quantity-pro">(20+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                        </div>
                                        {/* Dual Pro End Here */}
                                        {/* Dual Pro Start Here */}
                                        <div className="dual-pro">
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <a href="product-details.html">
                                                        <img className="primary-img" src="img/products/p4.jpg" alt="single-product" />
                                                    </a>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><a href="product-details.html">Orango mousepad</a></h4>
                                                        <p><span className="special-price">$38.99</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <span className="quantity-pro">(40+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <a href="product-details.html">
                                                        <img className="primary-img" src="img/products/p5.jpg" alt="single-product" />
                                                    </a>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><a href="product-details.html">camcoder Pro</a></h4>
                                                        <p><span className="special-price">$60.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <span className="quantity-pro">(40+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                        </div>
                                        {/* Dual Pro End Here */}
                                        {/* Dual Pro Start Here */}
                                        <div className="dual-pro">
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <a href="product-details.html">
                                                        <img className="primary-img" src="img/products/p7.jpg" alt="single-product" />
                                                    </a>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><a href="product-details.html">aliquam interdum</a></h4>
                                                        <p><span className="special-price">$10.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                            <span className="quantity-pro">(70+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <a href="product-details.html">
                                                        <img className="primary-img" src="img/products/p8.jpg" alt="single-product" />
                                                    </a>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><a href="product-details.html">bibendum porta</a></h4>
                                                        <p><span className="special-price">$140.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                            <span className="quantity-pro">(40+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                        </div>
                                        {/* Dual Pro End Here */}
                                    </OwlCarousel>
                                </div>
                            </div>
                            {/* Onsale Product End Here */}
                        </div>
                    </div>
                </div>
                {/* Banner & OnSale Area End Here */}
            </div>
        )
    }
}

export default Onsale;