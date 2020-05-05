import React from 'react';
import store from 'store';
import { Redirect } from 'react-router-dom';

export const Logout = () => {
    store.remove('token');
    return <Redirect to="/login" />;
};

export default Logout;
