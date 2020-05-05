import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Product } from './components/product/Product';
import { AddProduct } from './components/product/AddProduct';
import { Logout } from './components/logout/Logout';
import store from 'store';

export const App: FunctionComponent = () => {
    const token = store.get('token');
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/products/add">
                        <AddProduct />
                    </Route>
                    <Route path="/products">
                        <Product />
                    </Route>
                    <Route path="/">{token ? <Redirect to="/products" /> : <Redirect to="/login" />}</Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
