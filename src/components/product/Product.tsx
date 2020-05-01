import React, { FunctionComponent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { List } from '../list/List';

const products = {
    ids: ['123', '456'],
    keys: ['name'],
    items: [['Aadhaar Masking'], ['Number Plate Recognition']],
    buttons: {
        primaryButton: {
            name: 'View Versions',
            link: '#',
        },
        secondaryButton: {
            name: 'Edit',
            link: '#',
        },
    },
};

export const Product: FunctionComponent = props => {
    const [redirect, setRedirect] = useState(0);

    const addProductButton = {
        name: 'Add new product',
        onClick: () => setRedirect(1),
    };

    if (redirect) return <Redirect to="/products/add" />;

    return (
        <Layout title="Products" primaryButton={addProductButton}>
            <List {...products} />
        </Layout>
    );
};

export default Product;
