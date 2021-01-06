import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel'
import Header from '../Header'
import Comments from '../Comments';
import Cookies from 'universal-cookie';
import Footer from '../Footer';
import { connect } from 'react-redux';

const postsPerPage = 3;

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ListView: [],
            next: 3,
            title: '',
            comments: '',
            rating: 0,
            RecommendProduct: []
        }
    }

    showRatings = (star) => {
        var result = [];

        for (var i = 1; i <= 5; i++) {
            result.push(<Fragment key={Math.random()}>
                <input type="radio" disabled defaultChecked={i === (5 - star + 1) ? true : false} /><label className="full" />
            </Fragment>)
        }

        return result;
    }

    showMoreComments = (ListReview) => {
        var result = null;

        if (ListReview.length > 0) {
            result = ListReview.slice(0, this.state.next).map((review, index) => {
                return (
                    <div className="row" key={index}>
                        <div className="col-sm-7">
                            <div className="review-block">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="review-block-name"><a href="#"><b style={{ fontSize: "15px" }}>{review.email}</b></a></div>
                                        <div className="review-block-date"><i style={{ fontSize: "14px" }}>{review.dateComment}</i><br /></div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="review-block-rate">
                                            <fieldset className="rating">
                                                {this.showRatings(review.star)}
                                            </fieldset>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="review-block-title">{review.title}</div>
                                        <div className="review-block-description">{review.content}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return result;
    }

    onCreateReview = (event) => {
        event.preventDefault();

        const cookies = new Cookies();

        const token = cookies.get('token');

        const dateObj = new Date();

        let date = (dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear());

        var { title, comments, rating } = this.state;

        var { product } = this.props;

        var review = {
            email: token.email ? token.email : token.username,
            productID: product.productID,
            title,
            content: comments,
            dateComment: date,
            star: parseInt(rating, 10)
        }

        this.props.onCreateReview(review, token.jwt);

        document.getElementById("reivewForm").reset();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ListReview != prevState.ListReview) {
            return {
                ListReview: nextProps.ListReview
            }
        }
        if (nextProps.RecommendProduct != prevState.RecommendProduct) {
            return {
                RecommendProduct: nextProps.RecommendProduct
            }
        }
        else return null;
    }

    handleShowMoreReviews = () => {
        this.setState((prev) => {
            return {
                next: prev.next + 3
            }
        })
    }

    tabContent = (images) => {
        var result = null;
        if (images.length > 0) {
            result = (
                images.map((image, index) => {
                    return (
                        <div id={`thumb` + (index + 1)} className={(index + 1 === 1) ? "tab-pane fade show active" : "tab-pane fade"} key={index}>
                            <a data-fancybox="images" href={image ? image.url : null}>
                                <img src={image ? image.url : null} alt="product-view" />
                            </a>
                        </div>
                    )
                })
            )
        }
        return result;
    }

    thumb = (images) => {
        var result = null;
        if (images.length > 0) {
            result = (
                images.map((image, index) => {
                    return (
                        <Link className={index === 0 ? "active" : ""}
                            data-toggle="tab"
                            data-target={`#thumb` + (index + 1)}
                            to="#"
                            key={index}>
                            <img src={image ? image.url : null} alt="product-thumbnail" ></img>
                        </Link>
                    )
                })
            )
        }
        return result;
    }

    showDetails = (phoneLaptop) => {
        let details = null;
        details = (
            <div>
                {phoneLaptop.screen ? <div> Screen : {phoneLaptop.screen} <br /> <hr /> </div> : null}
                {phoneLaptop.os ? <div> OS : {phoneLaptop.os} <br /> <hr /> </div> : null}
                {phoneLaptop.camera1 ? <div> Front Camera : {phoneLaptop.camera1} <br /> <hr /> </div> : null}
                {phoneLaptop.camera2 ? <div> Rear Camera : {phoneLaptop.camera2} <br /> <hr /> </div> : null}
                {phoneLaptop.cpu ? <div> CPU : {phoneLaptop.cpu} <br /> <hr /> </div> : null}
                {phoneLaptop.ram ? <div> RAM : {phoneLaptop.ram} <br /> <hr /> </div> : null}
                {phoneLaptop.memory ? <div> Memory : {phoneLaptop.memory} <br /> <hr /> </div> : null}
                {phoneLaptop.sim ? <div> SIM : {phoneLaptop.sim} <br /> <hr /> </div> : null}
                {phoneLaptop.hardDrive ? <div> Hard Drive : {phoneLaptop.hardDrive} <br /> <hr /> </div> : null}
                {phoneLaptop.cardScreen ? <div> Card Screen : {phoneLaptop.cardScreen} <br /> <hr /> </div> : null}
                {phoneLaptop.connector ? <div> Connector : {phoneLaptop.connector} <br /> <hr /> </div> : null}
                {phoneLaptop.material ? <div> Material : {phoneLaptop.material} <br /> <hr /> </div> : null}
                {phoneLaptop.size ? <div> Size : {phoneLaptop.size} <br /> <hr /> </div> : null}
                {phoneLaptop.battery ? <div> Battery : {phoneLaptop.battery} <br /> </div> : null}
            </div>
        )
        return details;
    }

    showItemRecommend = (ListRecommendProduct) => {
        var result = null;

        if (ListRecommendProduct.length > 0) {
            result = ListRecommendProduct.map((product, index) => {
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
        }
        return result;
    }

    render() {

        const relatedProduct = {
            items: 4,
            nav: true,
            dots: false,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
            navElement: 'div',
            autoplay: true,
            loop: true,
            autoplayHoverPause: true,
            margin: 20,
        }

        const thumbnail = {
            items: 4,
            nav: true,
            dots: false,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
            navElement: 'div',
            margin: 20,
            lazyLoad: true
        }

        var { product, ListReview, RecommendProduct } = this.props;

        if (Object.keys(product).length === 0) return null;

        else {
            var { phoneLaptop, brand, images } = product;

            return (
                <div className="wrapper">
                    <Header />
                    <div>
                        {/* Breadcrumb Area Start Here */}
                        <div className="breadcrumb-area">
                            <div className="container">
                                <ol className="breadcrumb breadcrumb-list">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Product Details</li>
                                </ol>
                            </div>
                        </div>
                        {/* Breadcrumb Area End Here */}
                        {/* Product Thumbnail Start */}
                        <div className="main-product-thumbnail ptb-80">
                            <div className="container">
                                <div className="row">
                                    {/* Main Thumbnail Image Start */}
                                    <div className="col-lg-5 col-md-6 mb-all-40">
                                        {/* Thumbnail Large Image start */}
                                        <div className="tab-content">
                                            {this.tabContent(images)}
                                        </div>
                                        {/* Thumbnail Large Image End */}
                                        {/* Thumbnail Image End */}
                                        <div className="product-thumbnail">
                                            <OwlCarousel className="thumb-menu nav tabs-area" role="tablist" {...thumbnail}>
                                                {this.thumb(images)}
                                            </OwlCarousel>
                                        </div>
                                        {/* Thumbnail image end */}
                                    </div>
                                    {/* Main Thumbnail Image End */}
                                    {/* Thumbnail Description Start */}
                                    <div className="col-lg-7 col-md-6">
                                        <div className="thubnail-desc ">
                                            <h3 className="product-header">{product.name}</h3>
                                            <ul className="rating-summary">
                                                <li className="rating-pro">
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star-o" />
                                                    <i className="fa fa-star-o" />
                                                    <i className="fa fa-star-o" />
                                                </li>
                                                <li className="read-review">
                                                    <a href="#">read reviews ({this.state.ListView ? this.state.ListView.length : 0})</a>
                                                </li>
                                                <li className="write-review">
                                                    <a href="#">write review</a>
                                                </li>
                                            </ul>
                                            <div className="pro-thumb-price mt-20">
                                                <p>
                                                    <span className="special-price">${product.price}</span>
                                                    <del className="old-price">$80.50</del>
                                                </p>
                                            </div>
                                            <div className="pro-desc-details">
                                                {this.showDetails(phoneLaptop)}
                                            </div>
                                            <ul className="pro-list-features">
                                                <li>Brands : &nbsp;
                                                    <a href="#">{brand.name}</a>
                                                </li>
                                            </ul>
                                            <br />
                                            <div className="quatity-stock">
                                                <button className="pro-cart">add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Thumbnail Description End */}
                                </div>
                                {/* Row End */}
                            </div>
                            {/* Container End */}
                        </div>
                        {/* Product Thumbnail End */}
                        {/* Product Thumbnail Description Start */}
                        <div className="thumnail-desc  pb-80">
                            <div className="container">
                                <div className="thumb-desc-inner">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <ul className="main-thumb-desc nav tabs-area" role="tablist">
                                                <li>
                                                    <a className="active" data-toggle="tab" href="#dtail">Description</a>
                                                </li>
                                                <li>
                                                    <a data-toggle="tab" href="#review">Reviews</a>
                                                </li>
                                            </ul>
                                            {/* Product Thumbnail Tab Content Start */}
                                            <div className="tab-content thumb-content">
                                                <div id="dtail" className="tab-pane fade show active">
                                                    <p>{product.description}</p>
                                                </div>
                                                <div id="review" className="tab-pane fade">
                                                    {/* Reviews Start */}
                                                    <div className="review">
                                                        <div className="group-title">
                                                            <h2>customer review</h2>
                                                        </div>
                                                        <div className="flex-comments">
                                                            {this.showMoreComments(this.state.ListReview)}
                                                            {this.state.ListReview.length > 3 ?
                                                                <Link to="#" id="loadMore" onClick={this.handleShowMoreReviews}>
                                                                    {this.state.next >= ListReview.length ? "No Content" : "Load More"}</Link> : null}
                                                        </div>
                                                    </div>
                                                    {/* Reviews Field Start */}
                                                    <div className="riview-field mt-40">
                                                        <form autoComplete="off" id="reivewForm" onSubmit={this.onCreateReview}>
                                                            <label className="req" htmlFor="subject">Rating Product</label>
                                                            <div>
                                                                <fieldset className="rating">
                                                                    <input type="radio" id="star5" name="rating" defaultValue={5} onChange={this.onChange} /><label className="full" htmlFor="star5" title="Awesome - 5 stars" />
                                                                    <input type="radio" id="star4" name="rating" defaultValue={4} onChange={this.onChange} /><label className="full" htmlFor="star4" title="Pretty good - 4 stars" />
                                                                    <input type="radio" id="star3" name="rating" defaultValue={3} onChange={this.onChange} /><label className="full" htmlFor="star3" title="Meh - 3 stars" />
                                                                    <input type="radio" id="star2" name="rating" defaultValue={2} onChange={this.onChange} /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars" />
                                                                    <input type="radio" id="star1" name="rating" defaultValue={1} onChange={this.onChange} /><label className="full" htmlFor="star1" title="Sucks big time - 1 star" />
                                                                </fieldset>
                                                            </div>
                                                            <br />
                                                            <br />
                                                            <label className="req" htmlFor="subject">Title</label>
                                                            <div>
                                                                <input type="text" className="form-control" id="title-review" name="title" onChange={this.onChange} required="required" defaultValue={""} />
                                                            </div>
                                                            <br />
                                                            <label className="req" htmlFor="subject">Comments</label>
                                                            <div>
                                                                <textarea className="form-control" rows={5} id="comments" name="comments" onChange={this.onChange} required="required" defaultValue={""} />
                                                            </div>
                                                            <button type="submit" className="customer-btn">Submit</button>
                                                        </form>
                                                    </div>
                                                    {/* Reviews Field Start */}
                                                </div>
                                                {/* Reviews End */}
                                            </div>
                                        </div>
                                        {/* Product Thumbnail Tab Content End */}
                                    </div>
                                </div>
                                {/* Row End */}
                            </div>
                        </div>
                        {/* Container End */}
                    </div>
                    {/* Product Thumbnail Description End */}
                    {/* More Product Start Here */}
                    {RecommendProduct.length > 0 ? <div className="more-product pb-80">
                        <div className="container">
                            <div className="section-title text-center mb-50">
                                <h2>Related Products</h2>
                            </div>
                            <OwlCarousel className="feature-pro-active" {...relatedProduct}>
                                {/* Single Product Start */}
                                {this.showItemRecommend(RecommendProduct)}
                                {/* Single Product End */}
                            </OwlCarousel>
                        </div>
                    </div> : null}
                    {/* More Product End Here */}
                    <Footer />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        RecommendProduct: state.recommend.ListRecommendProduct
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, null)(ProductDetails);
