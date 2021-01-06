import React, { Component } from 'react'

class DualBanner extends Component {
    render() {
        return (
            <div>
                {/* Dual Banner Start Here */}
                <div className="dual-banner pb-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mb-sm-30">
                                {/* Single Bannner Start Here */}
                                <div className="single-banner zoom">
                                    <a href="shop.html"><img src="img/banner/b2.jpg" alt="banner-img" /></a>
                                </div>
                                {/* Single Bannner End Here */}
                            </div>
                            <div className="col-md-6">
                                {/* Single Bannner Start Here */}
                                <div className="single-banner zoom">
                                    <a href="shop.html"><img src="img/banner/b3.jpg" alt="banner-img" /></a>
                                </div>
                                {/* Single Bannner End Here */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Dual Banner End Here */}
            </div>
        )
    }
}

export default DualBanner