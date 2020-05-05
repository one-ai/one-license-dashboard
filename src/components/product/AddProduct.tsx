import React, { FunctionComponent, useState } from 'react';
import { Layout } from '../layout/Layout';
import { PrimaryForm, FormProps } from '../form/Form';

export const AddProduct: FunctionComponent = props => {
    const successMessage = 'Your product has been created successfully. You can view it on the products page.';
    const [success, setSuccess] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products`;

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
            name: {
                name: 'Name',
                type: 'text',
                required: true,
                sectionId: 'product-data',
                value: '',
            },
            description: {
                name: 'Description',
                type: 'textarea',
                required: true,
                sectionId: 'product-data',
                value: '',
            },
            metadata: {
                name: 'Metadata',
                type: 'metadata',
                required: false,
                sectionId: 'product-meta-data',
                value: '',
                disabled: true,
            },
        },
        submitUrl,
        onError: (message: string) => setErrorMessage(message),
        onSuccess: (state: number) => setSuccess(state),
    };

    return (
        <Layout
            title="Add New Product"
            successMessage={success ? successMessage : ''}
            errorMessage={errorMessage ? errorMessage : ''}
        >
            <PrimaryForm {...formProps} />
        </Layout>
    );
};

export default AddProduct;
