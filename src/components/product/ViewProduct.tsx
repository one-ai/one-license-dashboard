import React, { FunctionComponent, useState, useEffect } from 'react';
import { Layout } from '../layout/Layout';
import { PrimaryForm, FormProps } from '../form/Form';
import { useParams } from 'react-router-dom';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';
import { BUTTON_TYPES } from '../button/Button';

interface ProductResponse {
    _id: string;
    name: string;
    updatedAt: Date;
    createdAt: Date;
    description: string;
    metadata: any;
}

export const ViewProduct: FunctionComponent = props => {
    const [successMessage, setSuccessMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formProps, setFormProps] = useState({} as FormProps);
    const { productId } = useParams();

    const deleteProduct = async () => {
        try {
            setProcessing(true);
            setSuccessMessage('');
            setErrorMessage('');

            const token = store.get('token');
            const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}`;
            const req = new APIRequester({ url: submitUrl })
                .setMethod(REQUEST_METHODS.DELETE)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = await res.json();

            console.log(resJson);

            setSuccessMessage('Your product has been deleted successfully.');
            setProcessing(false);
        } catch (err) {
            setProcessing(false);
            console.log(err);
            if (err.title) return setErrorMessage(err.title);
            return setErrorMessage(err.message);
        }
    };

    const primaryButton = {
        name: 'Delete',
        onClick: deleteProduct,
        type: BUTTON_TYPES.DANGER_INVERSE,
        processing: processing,
    };

    const transformResponse = (product: ProductResponse) => {
        const formProps: FormProps = {
            sections: {
                'product-data': {
                    name: 'Product Data',
                    description: 'These are required fields that perfectly describe your product',
                },
                'product-meta-data': {
                    name: 'Product Meta Data',
                    description: 'These are optional fields that complement your product data.',
                },
            },
            fields: {
                id: {
                    name: 'ID',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: product._id,
                    disabled: true,
                    send: false,
                },
                name: {
                    name: 'Name',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: product.name,
                },
                description: {
                    name: 'Description',
                    type: 'textarea',
                    required: true,
                    sectionId: 'product-data',
                    value: product.description,
                },
                createdAt: {
                    name: 'Created At',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: new Date(product.createdAt).toString(),
                    disabled: true,
                    send: false,
                },
                updatedAt: {
                    name: 'Updated At',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: new Date(product.updatedAt).toString(),
                    disabled: true,
                    send: false,
                },
                metadata: {
                    name: 'Metadata',
                    type: 'text',
                    required: false,
                    sectionId: 'product-meta-data',
                    value: '',
                    disabled: true,
                },
            },
            submitUrl: `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}`,
            requestType: REQUEST_METHODS.PUT,
            onError: (message: string) => setErrorMessage(message),
            onSuccess: (state: number) => setSuccessMessage('Your product has been updated.'),
            submitButton: {
                name: 'Update',
                type: BUTTON_TYPES.PRIMARY_INVERSE,
            },
        };
        setFormProps(formProps);
    };

    // Fetch products from server
    const getProduct = async () => {
        const productsEndpoint = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}`;

        try {
            const token = store.get('token');
            const req = new APIRequester({ url: productsEndpoint })
                .setMethod(REQUEST_METHODS.GET)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = (await res.json()) as ProductResponse;
            transformResponse(resJson);
            return;
        } catch (err) {
            console.log(err);
            if (err.title) return setErrorMessage(err.title);
            return setErrorMessage(err.message);
        }
    };

    // Initiate product fetch only after components has mounted
    useEffect(() => {
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title={`Product View`}
            successMessage={successMessage ? successMessage : undefined}
            errorMessage={errorMessage ? errorMessage : undefined}
            primaryButton={primaryButton}
        >
            {formProps.sections ? <PrimaryForm {...formProps} /> : undefined}
        </Layout>
    );
};

export default ViewProduct;
