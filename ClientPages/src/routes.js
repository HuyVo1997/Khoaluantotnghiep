import React from 'react';
import CartContainer from './containers/CartContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import HomepageContainer from './containers/HomepageContainer';
import LoginPageContainer from './containers/LoginPageContainer';
import ProductContainer from './containers/ProductContainer';
import ShopContainer from './containers/ShopContainer';
import AccountContainer from './containers/AccountContainer';
import OrderDetailsContainer from './containers/OrderDetailsContainer';
import RegisterContainer from './containers/RegisterContainer';
import Login from './components/Login';

export const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomepageContainer />
    },

    {
        path: '/login',
        exact: false,
        main: ({ history }) => <LoginPageContainer history={history} />
    },

    {
        path: '/shop/:brand',
        exact: false,
        main: ({ match, location }) => <ShopContainer match={match} location={location} />
    },

    {
        path: '/product-details/:productID',
        exact: false,
        main: ({ match }) => <ProductContainer match={match} />
    },

    {
        path: '/checkout',
        exact: false,
        main: ({ history }) => <CheckoutContainer history={history} />
    },

    {
        path: '/cart',
        exact: false,
        main: () => <CartContainer />
    },

    {
        path: '/account',
        exact: false,
        main: () => <AccountContainer />
    },

    {
        path: '/order-details/:orderID',
        exact: false,
        main: ({ match }) => <OrderDetailsContainer match={match} />
    },
        
    {
        path : '/register',
        exact : false,
        main : () => <RegisterContainer />
    },

    {
        path : '/logout',
        exact : false,
        main : () => <LoginPageContainer />
    }
]