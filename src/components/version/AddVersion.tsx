import React, { FunctionComponent, useState } from 'react';
import { Layout } from '../layout/Layout';
import { PrimaryForm, FormProps } from '../form/Form';
import { useParams } from 'react-router-dom';

export const AddVersion: FunctionComponent = props => {
    const successMessage = 'Your version has been created successfully. You can view it on the versions page.';
    const [success, setSuccess] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const { productId } = useParams();
    const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions`;

    const formProps: FormProps = {
        sections: {
            'version-data': {
                name: 'Version Data',
                description: 'These are required fields that perfectly describe your version',
            },
            'version-meta-data': {
                name: 'Version Meta Data',
                description: 'These are optional fields that complement your version data.',
            },
        },
        fields: {
            name: {
                name: 'Name',
                type: 'text',
                required: true,
                sectionId: 'version-data',
                value: '',
            },
            description: {
                name: 'Description',
                type: 'textarea',
                required: true,
                sectionId: 'version-data',
                value: '',
            },
            metadata: {
                name: 'Metadata',
                type: 'text',
                required: false,
                sectionId: 'version-meta-data',
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
            title="Add New Version"
            successMessage={success ? successMessage : ''}
            errorMessage={errorMessage ? errorMessage : ''}
        >
            <PrimaryForm {...formProps} />
        </Layout>
    );
};

export default AddVersion;
