import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';

class SliderArea extends Component {
    render() {
        const slider = {
            items: 1,
            loop: true,
            nav: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
            navElement: 'div',
        }
        return (
            <div>
                {/* Slider Area Start */}
                <OwlCarousel className="slider-activation" {...slider}>
                    {/* Start Single Slide */}
                    <div className="slide align-center-left fullscreen animation-style-01 bg-image-1 ">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5 col-md-5">
                                    <div className="sldier-right-img">
                                        <img src="img/slider/s1_1.png" alt="slider-img" />
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7">
                                    <div className="slider-content">
                                        <h6>Best Products</h6>
                                        <h1>Mount Carved 2200XD</h1>
                                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
                                        <div className="slide-btn small-btn">
                                            <a href="shop.html">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Single Slide */}
                    {/* Start Single Slide */}
                    <div className="slide align-center-left fullscreen animation-style-02 bg-image-1">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5 col-md-5">
                                    <div className="sldier-right-img">
                                        <img src="img/slider/s1_2.png" alt="slider-img" />
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7">
                                    <div className="slider-content">
                                        <h6>Best deal of the year</h6>
                                        <h1>Mount Carved 2200XD</h1>
                                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
                                        <div className="slide-btn small-btn">
                                            <a href="#best-deal">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Single Slide */}
                </OwlCarousel>
                {/* Slider Area End */}
            </div>
        )
    }
}

export default SliderArea
