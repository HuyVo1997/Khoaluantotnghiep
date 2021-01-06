import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import DualBanner from './DualBanner';
import FeatureProduct from './FeatureProduct';
import HotDeal from './HotDeal';
import LargeBanner from './LargeBanner';
import Products from './Products';
import ProductItem from './Products/ProductItem';
import SliderArea from './SliderArea';

class HomePage extends Component {
    render() {
        var { listProduct, topProduct, ShopActions } = this.props;
        return (
            <div className="wrapper">
                <Header />
                <SliderArea />
                <HotDeal />
                <FeatureProduct  topProduct = {topProduct}
                                 ShopActions = {ShopActions} />
                <DualBanner />
                <Products listProduct={listProduct}  />
                <LargeBanner />
                <Footer />
            </div>
        )
    }

    showItems = (listProduct) => {
        var result = null;
        if (listProduct.length > 0) {
            result = listProduct.map((product, index) => {
                return <ProductItem key={index}
                    product={product}
                    index={index} />
            });
        }
        return result;
    }
}

export default HomePage