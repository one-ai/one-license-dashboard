import React, { FunctionComponent, useState, useEffect } from 'react';
import { Layout } from '../layout/Layout';
import { PrimaryForm, FormProps } from '../form/Form';
import { useParams } from 'react-router-dom';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';
import { BUTTON_TYPES } from '../button/Button';

interface VersionResponse {
    _id: string;
    name: string;
    updatedAt: Date;
    createdAt: Date;
    description: string;
    product: { _id: string; name: string };
    metadata: any;
}

export const ViewVersion: FunctionComponent = props => {
    const [successMessage, setSuccessMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [formProps, setFormProps] = useState({} as FormProps);
    const { productId, versionId } = useParams();

    const deleteVersion = async () => {
        try {
            setProcessing(true);
            setSuccess(0);
            setErrorMessage('');

            const token = store.get('token');
            const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}`;
            const req = new APIRequester({ url: submitUrl })
                .setMethod(REQUEST_METHODS.DELETE)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = await res.json();

            console.log(resJson);

            setSuccessMessage('Your version has been deleted successfully.');
            setSuccess(1);
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
        onClick: deleteVersion,
        type: BUTTON_TYPES.DANGER_INVERSE,
        processing: processing,
    };

    const transformResponse = (version: VersionResponse) => {
        const formProps: FormProps = {
            sections: {
                'version-data': {
                    name: 'Version Data',
                    description: 'These are required fields that perfectly describe your version',
                },
                'product-data': {
                    name: 'Product Data',
                    description: 'Details of parent product.',
                },
                'version-meta-data': {
                    name: 'Version Meta Data',
                    description: 'These are optional fields that complement your version data.',
                },
            },
            fields: {
                id: {
                    name: 'ID',
                    type: 'text',
                    required: true,
                    sectionId: 'version-data',
                    value: version._id,
                    disabled: true,
                    send: false,
                },
                name: {
                    name: 'Name',
                    type: 'text',
                    required: true,
                    sectionId: 'version-data',
                    value: version.name,
                },
                description: {
                    name: 'Description',
                    type: 'textarea',
                    required: true,
                    sectionId: 'version-data',
                    value: version.description,
                },
                createdAt: {
                    name: 'Created At',
                    type: 'text',
                    required: true,
                    sectionId: 'version-data',
                    value: new Date(version.createdAt).toString(),
                    disabled: true,
                    send: false,
                },
                updatedAt: {
                    name: 'Updated At',
                    type: 'text',
                    required: true,
                    sectionId: 'version-data',
                    value: new Date(version.updatedAt).toString(),
                    disabled: true,
                    send: false,
                },
                productId: {
                    name: 'Product ID',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: version.product._id,
                    disabled: true,
                    send: false,
                },
                productName: {
                    name: 'Product Name',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: version.product.name,
                    disabled: true,
                    send: false,
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
            submitUrl: `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}`,
            requestType: REQUEST_METHODS.PUT,
            onError: (message: string) => setErrorMessage(message),
            onSuccess: (state: number) => setSuccess(state),
            submitButton: {
                name: 'Update',
                type: BUTTON_TYPES.PRIMARY_INVERSE,
            },
        };
        setFormProps(formProps);
    };

    // Fetch versions from server
    const getVersion = async () => {
        const versionsEndpoint = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}`;

        try {
            const token = store.get('token');
            const req = new APIRequester({ url: versionsEndpoint })
                .setMethod(REQUEST_METHODS.GET)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = (await res.json()) as VersionResponse;
            transformResponse(resJson);
            return;
        } catch (err) {
            console.log(err);
            if (err.title) return setErrorMessage(err.title);
            return setErrorMessage(err.message);
        }
    };

    // Initiate version fetch only after components has mounted
    useEffect(() => {
        getVersion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title={`Version View`}
            successMessage={success ? successMessage : ''}
            errorMessage={errorMessage ? errorMessage : ''}
            primaryButton={primaryButton}
        >
            {formProps.sections ? <PrimaryForm {...formProps} /> : undefined}
        </Layout>
    );
};

export default ViewVersion;
