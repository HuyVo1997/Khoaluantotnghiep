import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div>
                 {/* Footer Area Start Here */}
                 <footer className="footer-area black-bg pt-60">
                    <div className="container">
                        <div className="footer-top">
                            <div className="footer-logo text-center">
                                <a href="index.html"><img src="img/logo/logo2.png" alt="footer-logo" /></a>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
                            </div>
                            {/* Support Area Start Here */}
                            <div className="support-area d-flex flex-wrap justify-content-between">
                                {/* Single Support Area Start Here */}
                                <div className="single-support mb-all-40">
                                    <div className="support-icon">
                                        <img src="img/support/s1.png" alt="support-icon" />
                                    </div>
                                    <div className="support-desc">
                                        <h6>Free Shipping</h6>
                                        <p>Most product are free <br /> shipping.</p>
                                    </div>
                                </div>
                                {/* Single Support Area End Here */}
                                {/* Single Support Area Start Here */}
                                <div className="single-support mb-all-40">
                                    <div className="support-icon">
                                        <img src="img/support/s2.png" alt="support-icon" />
                                    </div>
                                    <div className="support-desc">
                                        <h6>Customer Support</h6>
                                        <p>24x7 Customer Support</p>
                                    </div>
                                </div>
                                {/* Single Support Area End Here */}
                                {/* Single Support Area Start Here */}
                                <div className="single-support">
                                    <div className="support-icon">
                                        <img src="img/support/s3.png" alt="support-icon" />
                                    </div>
                                    <div className="support-desc">
                                        <h6>Secure Payment</h6>
                                        <p>Most Secure Payment <br /> for customer.</p>
                                    </div>
                                </div>
                                {/* Single Support Area End Here */}
                            </div>
                            {/* Support Area End Here */}
                        </div>
                    </div>
                    <div className="footer-bottom text-center ptb-15 off-black-bg">
                        <p className="copyright">Copyright©  All right reserved</p>
                    </div>
                </footer>
                {/* Footer Area End Here */}
                {/* Quick View Content Start */}
                <div className="main-product-thumbnail quick-thumb-content">
                    <div className="container">
                        {/* The Modal */}
                        <div className="modal fade" id="myModal">
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    {/* Modal Header */}
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">×</button>
                                    </div>
                                    {/* Modal body */}
                                    <div className="modal-body">
                                        <div className="row">
                                            {/* Main Thumbnail Image Start */}
                                            <div className="col-md-6 mb-all-40">
                                                {/* Thumbnail Large Image start */}
                                                <div className="tab-content">
                                                    <div id="thumb-menu-1" className="tab-pane fade show active">
                                                        <a data-fancybox="images" href="img/products/p2.jpg"><img src="img/products/p2.jpg" alt="product-view" /></a>
                                                    </div>
                                                    <div id="thumb-menu-2" className="tab-pane fade">
                                                        <a data-fancybox="images" href="img/products/p3.jpg"><img src="img/products/p3.jpg" alt="product-view" /></a>
                                                    </div>
                                                    <div id="thumb-menu-3" className="tab-pane fade">
                                                        <a data-fancybox="images" href="img/products/p4.jpg"><img src="img/products/p4.jpg" alt="product-view" /></a>
                                                    </div>
                                                    <div id="thumb-menu-4" className="tab-pane fade">
                                                        <a data-fancybox="images" href="img/products/p5.jpg"><img src="img/products/p5.jpg" alt="product-view" /></a>
                                                    </div>
                                                    <div id="thumb-menu-5" className="tab-pane fade">
                                                        <a data-fancybox="images" href="img/products/p1.jpg"><img src="img/products/p1.jpg" alt="product-view" /></a>
                                                    </div>
                                                </div>
                                                {/* Thumbnail Large Image End */}
                                                {/* Thumbnail Image Start */}
                                                <div className="product-thumbnail">
                                                    <div className="thumb-menu owl-carousel nav tabs-area" role="tablist">
                                                        <a className="active" data-toggle="tab" href="#thumb-menu-1"><img src="img/thumbnail/th2.png" alt="product-thumbnail" /></a>
                                                        <a data-toggle="tab" href="#thumb-menu-2"><img src="img/thumbnail/th3.png" alt="product-thumbnail" /></a>
                                                        <a data-toggle="tab" href="#thumb-menu-3"><img src="img/thumbnail/th4.png" alt="product-thumbnail" /></a>
                                                        <a data-toggle="tab" href="#thumb-menu-4"><img src="img/thumbnail/th5.png" alt="product-thumbnail" /></a>
                                                        <a data-toggle="tab" href="#thumb-menu-5"><img src="img/thumbnail/th1.png" alt="product-thumbnail" /></a>
                                                    </div>
                                                </div>
                                                {/* Thumbnail image end */}
                                            </div>
                                            {/* Main Thumbnail Image End */}
                                            {/* Thumbnail Description Start */}
                                            <div className="col-md-6">
                                                <div className="thubnail-desc ">
                                                    <h3 className="product-header">Ponno Real Box</h3>
                                                    <ul className="rating-summary">
                                                        <li className="rating-pro">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                        </li>
                                                        <li className="read-review"><a href="#">read reviews (1)</a></li>
                                                        <li className="write-review"><a href="#">write review</a></li>
                                                    </ul>
                                                    <div className="pro-thumb-price mt-20">
                                                        <p><span className="special-price">$84.17</span><del className="old-price">$80.50</del></p>
                                                    </div>
                                                    <ul className="pro-list-features">
                                                        <li>Ex Tax: <span className="ex-text">$68.71</span></li>
                                                        <li>Brands <a href="#">Maron</a></li>
                                                        <li>Product Code: <span>Drone</span></li>
                                                        <li>Reward Points: <span>200</span></li>
                                                        <li>Availability: <span>In Stock</span></li>
                                                    </ul>
                                                    <div className="product-size mtb-30 clearfix">
                                                        <label>Size</label>
                                                        <select>
                                                            <option>S</option>
                                                            <option>M</option>
                                                            <option>L</option>
                                                        </select>
                                                    </div>
                                                    <div className="quatity-stock">
                                                        <label>Quantity</label>
                                                        <ul className="d-flex flex-wrap">
                                                            <li className="box-quantity">
                                                                <form action="#">
                                                                    <input className="quantity" type="number" min={1} defaultValue={1} />
                                                                </form>
                                                            </li>
                                                            <li>
                                                                <button className="pro-cart">add to cart</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Thumbnail Description End */}
                                        </div>
                                        {/* Row End */}
                                    </div>
                                    {/* Modal footer */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quick View Content End */}
            </div>
        )
    }
}
export default Footer