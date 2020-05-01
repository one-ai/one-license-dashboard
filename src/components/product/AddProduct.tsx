import React, { FunctionComponent, useState } from 'react';
import { Layout } from '../layout/Layout';
import { PrimaryForm, FormProps } from '../form/Form';

const formProps: FormProps = {
    sections: [
        {
            id: 'product-data',
            name: 'Product Data',
            description: 'These are required fields that perfectly describe your product',
        },
        {
            id: 'product-meta-data',
            name: 'Product Meta Data',
            description: 'These are optional data that complement your product data.',
        },
    ],
    fields: [
        {
            name: 'Name',
            type: 'text',
            required: true,
            sectionId: 'product-data',
        },
        {
            name: 'Description',
            type: 'textarea',
            required: true,
            sectionId: 'product-data',
        },
        {
            name: 'Metadata',
            type: 'metadata',
            required: false,
            sectionId: 'product-meta-data',
        },
    ],
};

export const AddProduct: FunctionComponent = props => {
    const successMessage = 'Your product has been created successfully. You can view it on the products page.';
    const [success, setSuccess] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
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
