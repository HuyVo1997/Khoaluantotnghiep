import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'

var ListProductTemp = [];

class Products extends Component {

    showItems = (listProduct, start, type) => {
        var result = null;

        if (ListProductTemp.length === 0) {
            ListProductTemp = listProduct;
        }

        if (listProduct.length > 0) {

            const productFilter = ListProductTemp.filter(product => product.typeProduct.type === type).slice(start, start + 3)

            result = productFilter.map((product, index) => {
                return (
                    <ProductItem key={index}
                        product={product}
                        index={index} />
                )
            })
        }
        return result;
    }

    render() {

        var { listProduct } = this.props;

        return (
            <div>
                {/* Laptop & Computer Products Start Here */}
                <div className="lapto-computers pb-80">
                    <div className="container">
                        <div className="electronics-list-area d-flex flex-wrap align-items-center justify-content-between mb-40">
                            <h5 className="e-header mb-sm-15">Products</h5>
                            <div className="e-tabs-list">
                                {/* Nav tabs */}
                                <ul className="nav tabs-area categorie-tabs-area" role="tablist">
                                    <li className="nav-item">
                                        <Link className="active" data-toggle="tab" data-target="#phone" to="#">phone</Link>
                                    </li>
                                    <li className="nav-item" >
                                        <Link data-toggle="tab" data-target="#laptop" to="#">laptop</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link data-toggle="tab" data-target="#accessories" to="#">accessories</Link>
                                    </li>
                                </ul>
                                {/* Tab Contetn Start */}
                            </div>
                        </div>
                        {/* Categorie Tab Contetn Start Here */}
                        <div className="tab-content pro-style-changer">
                            {/* Computer Product Start Here */}
                            <div id="phone" className="tab-pane fade show active">
                                <div className="row">

                                    <div className="col-xl-4 col-lg-6 col-md-6 mb-lg-40">
                                        <div className="tripple-pro">
                                            {this.showItems(listProduct, 0, "Phone")}
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-6 col-md-6 mb-lg-40">
                                        <div className="tripple-pro">
                                            {this.showItems(listProduct, 3, "Phone")}
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-6 col-md-6 mb-lg-40">
                                        <div className="tripple-pro">
                                            {this.showItems(listProduct, 6, "Phone")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Computer Product End Here */}
                            {/* Laptop Product Start Here */}
                            <div id="laptop" className="tab-pane fade">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-6 col-md-6 mb-lg-40">
                                        <div className="tripple-pro">
                                            {this.showItems(listProduct, 0, "Laptop")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Laptop Product End Here */}
                            {/* Camera Product Start Here */}
                            <div id="accessories" className="tab-pane fade">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-6 col-md-6 mb-lg-40">
                                        {/* Tripple Product Start Here*/}
                                        <div className="tripple-pro">
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <Link to="product-details.html">
                                                        <img className="primary-img" src="img/products/p1.jpg" alt="single-product" />
                                                    </Link>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><Link to="product-details.html">specimen book</Link></h4>
                                                        <p><span className="special-price">$140.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <span className="quantity-pro">(25+)</span>
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
                                                    <Link to="product-details.html">
                                                        <img className="primary-img" src="img/products/p2.jpg" alt="single-product" />
                                                    </Link>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><Link to="product-details.html">randomised words</Link></h4>
                                                        <p><span className="special-price">$140.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                            <i className="fa fa-star-o" />
                                                            <span className="quantity-pro">(37+)</span>
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
                                                    <Link to="product-details.html">
                                                        <img className="primary-img" src="img/products/p3.jpg" alt="single-product" />
                                                    </Link>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><Link to="product-details.html">lacinia habitasse</Link></h4>
                                                        <p><span className="special-price">$37.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <span className="quantity-pro">(15+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                        </div>
                                        {/* Tripple Product Start Here*/}
                                    </div>
                                </div>
                            </div>
                            {/* Camera Product End Here */}
                            
                            {/* Others Product Start Here */}
                            <div id="others" className="tab-pane fade">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        {/* Tripple Product Start Here*/}
                                        <div className="tripple-pro">
                                            {/* Single Product Start */}
                                            <div className="single-ponno-product">
                                                {/* Product Image Start */}
                                                <div className="pro-img">
                                                    <Link to="product-details.html">
                                                        <img className="primary-img" src="img/products/p1.jpg" alt="single-product" />
                                                    </Link>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><Link to="product-details.html">Finibus Bonorum</Link></h4>
                                                        <p><span className="special-price">$30.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-sta-o" />
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
                                                    <Link to="product-details.html">
                                                        <img className="primary-img" src="img/products/p3.jpg" alt="single-product" />
                                                    </Link>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><Link to="product-details.html">predefined chunks</Link></h4>
                                                        <p><span className="special-price">$20.90</span></p>
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
                                                    <Link to="product-details.html">
                                                        <img className="primary-img" src="img/products/p4.jpg" alt="single-product" />
                                                    </Link>
                                                </div>
                                                {/* Product Image End */}
                                                {/* Product Content Start */}
                                                <div className="pro-content">
                                                    <div className="pro-info">
                                                        <h4><Link to="product-details.html">Ponno Real Box</Link></h4>
                                                        <p><span className="special-price">$140.00</span></p>
                                                        <div className="product-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <span className="quantity-pro">(30+)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Content End */}
                                            </div>
                                            {/* Single Product End */}
                                        </div>
                                        {/* Tripple Product Start Here*/}
                                    </div>
                                </div>
                            </div>
                            {/* Others Product End Here */}
                        </div>
                        {/* Categorie Tab Contetn End Here */}
                    </div>
                </div>
                {/* Laptop & Computer Products End Here */}
            </div>
        )
    }
}
export default Products