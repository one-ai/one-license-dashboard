import React, { FunctionComponent, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { List } from '../list/List';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';
import { ListItem, ListProps } from '../list/List';

interface ResponseProduct {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    name: string;
    owner: string;
}

export const ViewProductList: FunctionComponent = props => {
    const [redirectToAdd, setRedirectToAdd] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState('');
    const [productList, setproductList] = useState({
        entityName: 'product',
    } as ListProps);

    const addProductButton = {
        name: 'Add new product',
        onClick: () => setRedirectToAdd(1),
    };

    const transformResponse = (products: ResponseProduct[]) => {
        const productList: ListProps = {
            items: [] as ListItem[],
            entityName: 'product',
        } as ListProps;

        products.map(product => {
            productList.items!.push({
                id: product._id,
                name: product.name,
                ...product,
                buttons: {
                    primaryButton: {
                        name: 'Versions',
                        link: `/products/${product._id}/versions`,
                    },
                    secondaryButton: {
                        name: 'View',
                        link: `/products/${product._id}`,
                    },
                },
            });
            return undefined;
        });
        setproductList(productList);
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
        <Layout title="Product List" primaryButton={addProductButton} initialized={initialized} errorMessage={error}>
            <List {...productList} />
        </Layout>
    );
};

export default ViewProductList;
