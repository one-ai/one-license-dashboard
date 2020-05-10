import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { ViewProductList } from './components/product/ViewProductList';
import { AddProduct } from './components/product/AddProduct';
import { ViewProduct } from './components/product/ViewProduct';
import { Logout } from './components/logout/Logout';
import { ViewVersionList } from './components/version/ViewVersionList';
import { AddVersion } from './components/version/AddVersion';
import { ViewVersion } from './components/version/ViewVersion';
import { ViewLicenseList } from './components/license/ViewLicenseList';
import { AddLicense } from './components/license/AddLicense';
import { ViewLicense } from './components/license/ViewLicense';
import { ViewLicenseInstructions } from './components/license/ViewLicenseInstructions';
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
                    <Route path="/products/:productId/versions/add">
                        <AddVersion />
                    </Route>
                    <Route path="/products/:productId/versions/:versionId/licenses/add">
                        <AddLicense />
                    </Route>
                    <Route path="/products/:productId/versions/:versionId/licenses/:licenseId/instructions">
                        <ViewLicenseInstructions />
                    </Route>
                    <Route path="/products/:productId/versions/:versionId/licenses/:licenseId">
                        <ViewLicense />
                    </Route>
                    <Route path="/products/:productId/versions/:versionId/licenses">
                        <ViewLicenseList />
                    </Route>
                    <Route path="/products/:productId/versions/:versionId">
                        <ViewVersion />
                    </Route>
                    <Route path="/products/:productId/versions">
                        <ViewVersionList />
                    </Route>
                    <Route path="/products/:productId">
                        <ViewProduct />
                    </Route>
                    <Route path="/products">
                        <ViewProductList />
                    </Route>
                    <Route path="/">{token ? <Redirect to="/products" /> : <Redirect to="/login" />}</Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
