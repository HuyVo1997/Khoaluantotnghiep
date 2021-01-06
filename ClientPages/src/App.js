import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import configureStore from './redux';
import './App.css';
import { routes } from './routes';
import ScrollToTop from "./ScrollToTops";
import Loading from './components/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ScrollToTop />
                <ToastContainer autoClose={2000} />
                <Loading />
                <Switch>
                    {this.showContentMenus(routes)}
                </Switch>
            </Provider>
        )
    }

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main} />
                )
            })
        }
        return result
    }
}

export default App;
