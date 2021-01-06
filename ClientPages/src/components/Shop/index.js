import React, { Component } from 'react'
import FilterProduct from '../FilterProduct';
import Footer from '../Footer'
import Header from '../Header'
import SortProduct from '../SortProduct';
import ProductByType from './ProductByType';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

var filterProduct = [];
var keepFilter = {
    Price: [],
    RAM: [],
    Memory: [],
    Battery: []
}

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: { min: 0, max: 2400 },
        };
    }

    showProducts = (listProduct) => {

        var { onAddProductToCart, location, sort, filter } = this.props;

        var result = null;

        if (listProduct.length > 0) {

            filterProduct = listProduct;

            if (sort !== undefined && filterProduct.length > 0) {
                filterProduct.sort((a, b) => {
                    if (sort.sortBy === 'name') {
                        return a.name > b.name ? sort.value : -sort.value;
                    }
                    else {
                        return a.price > b.price ? -sort.value : sort.value
                    }
                })
            }

            filterProduct = [...listProduct.filter(products => 
                (products.price >= this.state.value.min && products.price <= this.state.value.max))]

            if (filter.RAM > 0) {

                var listProductFilter = [];

                listProductFilter = listProduct.filter(products => (filter.RAM === 3 ? parseInt(products.phoneLaptop.ram.substring(0, 3).trim(), 10) <= 3
                    : (filter.RAM === 6 ? (parseInt(products.phoneLaptop.ram.substring(0, 3).trim(), 10) <= 6 && parseInt(products.phoneLaptop.ram.substring(0, 2).trim(), 10) >= 4)
                        : parseInt(products.phoneLaptop.ram.substring(0, 3).trim(), 10) >= 8)))

                if (keepFilter.Memory.length > 0) {
                    listProductFilter = listProductFilter.filter(products => keepFilter.Memory.includes(products));
                }

                if (keepFilter.Battery.length > 0) {
                    listProductFilter = listProductFilter.filter(products => keepFilter.Battery.includes(products))
                }

                filterProduct = listProductFilter;

                keepFilter.RAM = filterProduct;
            }

            if (filter.Memory > 0) {

                var listProductFilter = [];

                listProductFilter = listProduct.filter(products => (filter.Memory === 31 ? parseInt(products.phoneLaptop.memory.substring(0, 3).trim(), 10) <= 31
                    : (filter.Memory === 32 ? (parseInt(products.phoneLaptop.memory.substring(0, 3).trim(), 10) <= 64 && parseInt(products.phoneLaptop.memory.substring(0, 3).trim(), 10) >= 32)
                        : (filter.Memory === 128 ? (parseInt(products.phoneLaptop.memory.substring(0, 3).trim(), 10) <= 256 && parseInt(products.phoneLaptop.memory.substring(0, 3).trim(), 10) >= 128)
                            : parseInt(products.phoneLaptop.memory.substring(0, 3).trim(), 10) >= 512))))

                if (keepFilter.RAM.length > 0) {
                    listProductFilter = listProductFilter.filter(products => keepFilter.RAM.includes(products));
                }

                if (keepFilter.Battery.length > 0) {
                    listProductFilter = listProductFilter.filter(products => keepFilter.Battery.includes(products))
                }

                filterProduct = listProductFilter

                keepFilter.Memory = filterProduct;
            }

            if (filter.Battery > 0) {

                listProductFilter = listProduct.filter(products =>
                (filter.Battery === 3000 ? (parseInt(products.phoneLaptop.battery.substring(0, 5).trim(), 10) <= 5000 && parseInt(products.phoneLaptop.battery.substring(0, 5).trim(), 10) >= 3000)
                    : parseInt(products.phoneLaptop.battery.substring(0, 5).trim(), 10) > 5000))

                if (keepFilter.RAM.length > 0) {
                    listProductFilter = listProductFilter.filter(products => keepFilter.RAM.includes(products));
                }

                if (keepFilter.Memory.length > 0) {
                    listProductFilter = listProductFilter.filter(products => keepFilter.Memory.includes(products))
                }

                filterProduct = listProductFilter

                keepFilter.Battery = filterProduct;
            }

            filterProduct = [...new Set(filterProduct)]

            result = filterProduct.map((product, index) => {
                return (
                    <ProductByType key={index}
                        product={product}
                        index={index}
                        onAddProductToCart={onAddProductToCart}
                        location={location} />
                )
            })

        }
        return result;
    }

    render() {

        var { productsByType, location, onSort, onFilter } = this.props;

        return (
            productsByType.length > 0 ? (
                <div className="wrapper">
                    <Header location={location} />
                    {/* Breadcrumb Area Start Here */}
                    <div className="breadcrumb-area">
                        <div className="container">
                            <ol className="breadcrumb breadcrumb-list">
                                <li className="breadcrumb-item">
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="breadcrumb-item active">shop</li>
                            </ol>
                        </div>
                    </div>
                    {/* Breadcrumb Area End Here */}
                    {/* Shop Page Start */}
                    <div className="main-shop-page ptb-80">
                        <div className="container">
                            {/* Row End */}
                            <div className="row">
                                {/* Sidebar Shopping Option Start */}
                                <div className="col-lg-3 order-2 order-lg-1 mt-all-30">
                                    <div className="sidebar shop-sidebar">
                                        {/* Price Filter Options Start */}
                                        <div className="search-filter mb-30">
                                            <h3 className="sidebar-title">filter by price</h3>
                                            <form className="form">
                                                <InputRange
                                                    maxValue={Math.max(...productsByType.map(o => o.price), 0)}
                                                    minValue={0}
                                                    value={this.state.value}
                                                    onChange={value => this.setState({ value })}
                                                    onChangeComplete={value => console.log(value)}
                                                />
                                            </form>
                                        </div>
                                        <FilterProduct location={location}
                                            onFilter={onFilter} />
                                    </div>
                                </div>
                                {/* Sidebar Shopping Option End */}
                                {/* Product Categorie List Start */}
                                <div className="col-lg-9 order-1 order-lg-2">
                                    {/* Grid & List View Start */}
                                    <div className="grid-list-top border-default universal-padding d-md-flex justify-content-md-between align-items-center mb-30">
                                        <div className="grid-list-view d-flex align-items-center  mb-sm-15">
                                            <ul className="nav tabs-area d-flex align-items-center">
                                                <li>
                                                    <a className="active" data-toggle="tab" href="#grid-view">
                                                        <i className="fa fa-th" />
                                                    </a>
                                                </li>
                                            </ul>
                                            <span className="show-items">There are {productsByType.length} products.</span>
                                        </div>
                                        {/* Toolbar Short Area Start */}
                                        <SortProduct onSort={onSort} />
                                        {/* Toolbar Short Area End */}
                                    </div>
                                    {/* Grid & List View End */}
                                    <div className="shop-area mb-all-40">
                                        {/* Grid & List Main Area End */}
                                        <div className="tab-content">
                                            <div id="grid-view" className="tab-pane fade show active">
                                                <div className="row border-hover-effect ">
                                                    {this.showProducts(productsByType)}
                                                </div>
                                                {/* Row End */}
                                            </div>
                                            {/* #grid view End */}

                                            {/* #list view End */}
                                        </div>
                                        {/* Grid & List Main Area End */}
                                    </div>
                                    {/* Shop Breadcrumb Area Start */}
                                    {/* <div className="shop-breadcrumb-area border-default">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 col-sm-5">
                                                <span className="show-items">Showing 1-12 of 13 item(s) </span>
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-7">
                                                <ul className="pfolio-breadcrumb-list text-center">
                                                    <li className="float-left prev">
                                                        <a href="#">
                                                            <i className="fa fa-angle-left" aria-hidden="true" />Previous</a>
                                                    </li>
                                                    <li className="active">
                                                        <a href="#">1</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">2</a>
                                                    </li>
                                                    <li className="float-right next">
                                                        <a href="#">Next
                      <i className="fa fa-angle-right" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* Shop Breadcrumb Area End */}
                                </div>
                                {/* product Categorie List End */}
                            </div>
                            {/* Row End */}
                        </div>
                        {/* Container End */}
                    </div>
                    {/* Shop Page End */}
                    <Footer />
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
                                                            <a data-fancybox="images" href="img/products/p2.jpg">
                                                                <img src="img/products/p2.jpg" alt="product-view" />
                                                            </a>
                                                        </div>
                                                        <div id="thumb-menu-2" className="tab-pane fade">
                                                            <a data-fancybox="images" href="img/products/p3.jpg">
                                                                <img src="img/products/p3.jpg" alt="product-view" />
                                                            </a>
                                                        </div>
                                                        <div id="thumb-menu-3" className="tab-pane fade">
                                                            <a data-fancybox="images" href="img/products/p4.jpg">
                                                                <img src="img/products/p4.jpg" alt="product-view" />
                                                            </a>
                                                        </div>
                                                        <div id="thumb-menu-4" className="tab-pane fade">
                                                            <a data-fancybox="images" href="img/products/p5.jpg">
                                                                <img src="img/products/p5.jpg" alt="product-view" />
                                                            </a>
                                                        </div>
                                                        <div id="thumb-menu-5" className="tab-pane fade">
                                                            <a data-fancybox="images" href="img/products/p1.jpg">
                                                                <img src="img/products/p1.jpg" alt="product-view" />
                                                            </a>
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
                                                            <li className="read-review">
                                                                <a href="#">read reviews (1)</a>
                                                            </li>
                                                            <li className="write-review">
                                                                <a href="#">write review</a>
                                                            </li>
                                                        </ul>
                                                        <div className="pro-thumb-price mt-20">
                                                            <p>
                                                                <span className="special-price">$84.17</span>
                                                                <del className="old-price">$80.50</del>
                                                            </p>
                                                        </div>
                                                        <ul className="pro-list-features">
                                                            <li>Ex Tax:
                        <span className="ex-text">$68.71</span>
                                                            </li>
                                                            <li>Brands
                        <a href="#">Maron</a>
                                                            </li>
                                                            <li>Product Code:
                        <span>Drone</span>
                                                            </li>
                                                            <li>Reward Points:
                        <span>200</span>
                                                            </li>
                                                            <li>Availability:
                        <span>In Stock</span>
                                                            </li>
                                                        </ul>
                                                        <div className="product-size mtb-30 clearfix">
                                                            <label>Size</label>
                                                            <select >
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
            ) : null
        )
    }
}

export default Shop
