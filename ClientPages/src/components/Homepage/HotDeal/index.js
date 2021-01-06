import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
import { Link, NavLink } from 'react-router-dom';


class HotDeal extends Component {
    render() {

        const hotDealOption = {
            items: 1,
            dots: false,
            autoplay: true,
            loop: true,
            autoplayHoverPause: true
        }

        return (
            <div>
                {/* Hot Deal Area Start Here */}
                <div className="hot-deal pt-50 pb-80">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-9 mb-lg-40">
                                <div className="single-hot-deal">
                                    <div className="row align-items-center">
                                        <div className="col-lg-7 col-md-8">
                                            <div className="deal-content">
                                                <div className="deal-text">
                                                    <h6>Hot Deal</h6>
                                                    <h2>Kemioo DX24 Headphone</h2>
                                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature</p>
                                                </div>
                                                <div className="countdown text-center" data-countdown="2020/12/1" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-4 mt-sm-40">
                                            <div className="deal-img">
                                                <img src="img/banner/b1_2.png" alt="banner-img" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                {/* Single Product Start */}
                                <OwlCarousel className="hot-deal deal-active" {...hotDealOption}>
                                    {/* Single Product Start */}
                                    <div className="single-ponno-product">
                                        {/* Product Image Start */}
                                        <div className="pro-img">
                                            <Link to={`/product-details`}>
                                                <img className="primary-img" src="img/products/p1.jpg" alt="single-product" />
                                                <img className="secondary-img" src="img/products/p2.jpg" alt="single-product" />
                                            </Link>
                                            <div className="pro-actions-link">
                                                <a href="compare.html" title="Compare"><span className="icon icon-MusicMixer" /></a>
                                                <a href="#" data-toggle="modal" data-target="#myModal" title="Quick View"><span className="icon icon-Eye" /></a>
                                            </div>
                                            <a className="sticker-new " href="wishlist.html"><span className="ti-heart" /></a>
                                            <span className="sticker-sale">new</span>
                                        </div>
                                        {/* Product Image End */}
                                        {/* Product Content Start */}
                                        <div className="pro-content">
                                            <div className="pro-info">
                                                <h4><NavLink to="/product-details">Ponno 360 Camera</NavLink></h4>
                                                <p><span className="special-price">$140.00</span></p>
                                                <div className="product-rating">
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star-o" />
                                                    <span className="quantity-pro">(200+)</span>
                                                </div>
                                            </div>
                                            <div className="pro-add-cart">
                                                <a href="cart.html" title="Add to Cart">Add To Cart</a>
                                            </div>
                                        </div>
                                        {/* Product Content End */}
                                    </div>
                                    {/* Single Product End */}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Hot Deal Area End Here */}
            </div>
        )
    }
}

export default HotDeal