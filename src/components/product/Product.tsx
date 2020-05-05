import React, { FunctionComponent, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { List } from '../list/List';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';

interface ProductTableData {
    ids: string[];
    keys: string[];
    items: string[][];
    buttons?: {
        [type: string]: {
            name: string;
            link: string;
        };
    };
}

interface ResponseProduct {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    name: string;
    owner: string;
}

export const Product: FunctionComponent = props => {
    const [redirectToAdd, setRedirectToAdd] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState('');
    const [productTableData, setproductTableData] = useState({
        ids: [],
        items: [],
        keys: [],
    } as ProductTableData);

    const addProductButton = {
        name: 'Add new product',
        onClick: () => setRedirectToAdd(1),
    };

    const transformResponse = (products: ResponseProduct[]) => {
        const newProductTableData: ProductTableData = {
            ids: [],
            items: [],
            keys: ['name'],
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
        } as ProductTableData;
        products.map(product => {
            newProductTableData.ids.push(product._id);
            newProductTableData.items.push([product.name]);
            return undefined;
        });
        setproductTableData(newProductTableData);
    };

    // Initiate product fetch only after components has mounted
    useEffect(() => {
        // Fetch products from server
        const getProducts = async () => {
            const productsEndpoint = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products`;

            try {
                const token = store.get('token');
                const req = new APIRequester({ url: productsEndpoint })
                    .setMethod(REQUEST_METHODS.GET)
                    .setHeaders({
                        Authorization: `Bearer ${token}`,
                    })
                    .request();
                const res = await req;
                const resJson = (await res.json()) as ResponseProduct[];
                resJson.reverse();
                transformResponse(resJson);
                setInitialized(true);
                return;
            } catch (err) {
                console.log(err);
                if (err.title) return setError(err.title);
                return setError(err.message);
            }
        };

        getProducts();
    }, []);

    if (redirectToAdd) return <Redirect to="/products/add" />;

    return (
        <Layout title="Products" primaryButton={addProductButton} initialized={initialized} errorMessage={error}>
            <List {...productTableData} />
        </Layout>
    );
};

export default Product;
