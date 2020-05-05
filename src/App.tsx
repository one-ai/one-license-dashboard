import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Product } from './components/product/Product';
import { AddProduct } from './components/product/AddProduct';
import { Logout } from './components/logout/Logout';

export const App: FunctionComponent = () => {
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
                </Switch>
            </Router>
        </div>
    );
};

export default App;
