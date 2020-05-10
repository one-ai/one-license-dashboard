import React, { FunctionComponent, useState, useEffect } from 'react';
import { Layout } from '../layout/Layout';
import { PrimaryForm, FormProps } from '../form/Form';
import { useParams, Redirect } from 'react-router-dom';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';
import { BUTTON_TYPES } from '../button/Button';

export enum SYNC_STRATEGY {
    HTTP = 'HTTP',
    SFTP = 'SFTP',
}

export enum SYNC_TRIGGER {
    AT_EVERY_CALL = 'AT_EVERY_CALL',
    AFTER_INTERVAL = 'AFTER_INTERVAL',
}

export enum LICENSE_TYPE {
    TIME_BOUND = 'TIME_BOUND',
    NO_OF_API_CALLS = 'NO_OF_API_CALLS',
    TIME_BOUND_AND_API_CALLS = 'TIME_BOUND_AND_API_CALLS',
}

export interface LicenseResponse {
    _id: string;
    name: string;
    updatedAt: Date;
    createdAt: Date;
    description: string;
    version: {
        _id: string;
        name: string;
        product: {
            _id: string;
            name: string;
        };
    };
    metadata: any;
    type: LICENSE_TYPE;
    syncInterval: number;
    syncTrigger: SYNC_TRIGGER;
    syncStrategy: SYNC_STRATEGY;
    expiresAt: Date;
    allowedApiCalls: number;
    apiCallCounter: number;
}

export const ViewLicense: FunctionComponent = props => {
    const [redirectToInstructions, setRedirectToInstructions] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formProps, setFormProps] = useState({} as FormProps);
    const { productId, versionId, licenseId } = useParams();

    const deleteLicense = async () => {
        try {
            setProcessing(true);
            setErrorMessage('');

            const token = store.get('token');
            const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}/licenses/${licenseId}`;
            const req = new APIRequester({ url: submitUrl })
                .setMethod(REQUEST_METHODS.DELETE)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = await res.json();

            console.log(resJson);

            setSuccessMessage('Your license has been deleted successfully.');
            setProcessing(false);
        } catch (err) {
            setProcessing(false);
            console.log(err);
            if (err.title) return setErrorMessage(err.title);
            return setErrorMessage(err.message);
        }
    };

    const secondaryButton = {
        name: 'Delete',
        onClick: deleteLicense,
        type: BUTTON_TYPES.DANGER_INVERSE,
        processing: processing,
    };

    const primaryButton = {
        name: 'View Use Instructions',
        onClick: () => setRedirectToInstructions(1),
        type: BUTTON_TYPES.PRIMARY,
        processing: processing,
    };

    const transformResponse = (license: LicenseResponse) => {
        const formProps: FormProps = {
            sections: {
                'license-data': {
                    name: 'License Data',
                    description: 'These are required fields that perfectly describe your license',
                },
                'product-data': {
                    name: 'Product Data',
                    description: 'Details of parent product.',
                },
                'version-data': {
                    name: 'Version Data',
                    description: 'Details of parent version.',
                },
                'license-meta-data': {
                    name: 'License Meta Data',
                    description: 'These are optional fields that complement your license data.',
                },
            },
            fields: {
                id: {
                    name: 'ID',
                    type: 'text',
                    required: true,
                    sectionId: 'license-data',
                    value: license._id,
                    disabled: true,
                    send: false,
                },
                name: {
                    name: 'Name',
                    type: 'text',
                    required: true,
                    sectionId: 'license-data',
                    value: license.name,
                },
                description: {
                    name: 'Description',
                    type: 'textarea',
                    required: true,
                    sectionId: 'license-data',
                    value: license.description,
                },
                type: {
                    name: 'Type',
                    type: 'select',
                    required: true,
                    sectionId: 'license-data',
                    options: [
                        {
                            id: LICENSE_TYPE.NO_OF_API_CALLS,
                            name: 'Limited API calls',
                            value: LICENSE_TYPE.NO_OF_API_CALLS,
                        },
                        {
                            id: LICENSE_TYPE.TIME_BOUND,
                            name: 'Time bound',
                            value: LICENSE_TYPE.TIME_BOUND,
                        },
                        {
                            id: LICENSE_TYPE.TIME_BOUND_AND_API_CALLS,
                            name: 'Limited API calls + Time bound',
                            value: LICENSE_TYPE.TIME_BOUND_AND_API_CALLS,
                        },
                    ],
                    value: license.type,
                },
                allowedApiCalls: {
                    name: 'API call limit',
                    type: 'number',
                    required: false,
                    sectionId: 'license-data',
                    value: license.allowedApiCalls,
                    dependsOn: {
                        id: 'type',
                        targetValues: [LICENSE_TYPE.NO_OF_API_CALLS, LICENSE_TYPE.TIME_BOUND_AND_API_CALLS],
                    },
                },
                apiCallCounter: {
                    name: 'API calls made till now',
                    type: 'number',
                    required: false,
                    sectionId: 'license-data',
                    value: license.apiCallCounter,
                    dependsOn: {
                        id: 'type',
                        targetValues: [LICENSE_TYPE.NO_OF_API_CALLS, LICENSE_TYPE.TIME_BOUND_AND_API_CALLS],
                    },
                    disabled: true,
                    send: false,
                },
                expiresAt: {
                    name: 'License valid until (mm/dd/yyyy)',
                    type: 'text',
                    required: false,
                    sectionId: 'license-data',
                    value: license.expiresAt ? new Date(license.expiresAt).toString() : '',
                    dependsOn: {
                        id: 'type',
                        targetValues: [LICENSE_TYPE.TIME_BOUND, LICENSE_TYPE.TIME_BOUND_AND_API_CALLS],
                    },
                },
                syncStrategy: {
                    name: 'Sync Strategy',
                    type: 'select',
                    required: true,
                    sectionId: 'license-data',
                    options: [
                        {
                            id: SYNC_STRATEGY.HTTP,
                            name: 'HTTP',
                            value: SYNC_STRATEGY.HTTP,
                        },
                        {
                            id: SYNC_STRATEGY.SFTP,
                            name: 'SFTP',
                            value: SYNC_STRATEGY.SFTP,
                        },
                    ],
                    value: license.syncStrategy,
                },
                syncTrigger: {
                    name: 'Sync Trigger',
                    type: 'select',
                    required: true,
                    sectionId: 'license-data',
                    options: [
                        {
                            id: SYNC_TRIGGER.AFTER_INTERVAL,
                            name: 'At fixed interval',
                            value: SYNC_TRIGGER.AFTER_INTERVAL,
                        },
                        {
                            id: SYNC_TRIGGER.AT_EVERY_CALL,
                            name: 'At every call',
                            value: SYNC_TRIGGER.AT_EVERY_CALL,
                        },
                    ],
                    value: license.syncTrigger,
                },
                syncInterval: {
                    name: 'Sync Interval (seconds)',
                    type: 'number',
                    required: false,
                    sectionId: 'license-data',
                    value: license.syncInterval,
                    dependsOn: {
                        id: 'syncTrigger',
                        targetValues: [SYNC_TRIGGER.AFTER_INTERVAL],
                    },
                },
                createdAt: {
                    name: 'Created At',
                    type: 'text',
                    required: true,
                    sectionId: 'license-data',
                    value: new Date(license.createdAt).toString(),
                    disabled: true,
                    send: false,
                },
                updatedAt: {
                    name: 'Updated At',
                    type: 'text',
                    required: true,
                    sectionId: 'license-data',
                    value: new Date(license.updatedAt).toString(),
                    disabled: true,
                    send: false,
                },
                productId: {
                    name: 'Product ID',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: license.version.product._id,
                    disabled: true,
                    send: false,
                },
                productName: {
                    name: 'Product Name',
                    type: 'text',
                    required: true,
                    sectionId: 'product-data',
                    value: license.version.product.name,
                    disabled: true,
                    send: false,
                },
                versionId: {
                    name: 'Version ID',
                    type: 'text',
                    required: true,
                    sectionId: 'version-data',
                    value: license.version._id,
                    disabled: true,
                    send: false,
                },
                versionName: {
                    name: 'Version Name',
                    type: 'text',
                    required: true,
                    sectionId: 'version-data',
                    value: license.version.name,
                    disabled: true,
                    send: false,
                },
                metadata: {
                    name: 'Metadata',
                    type: 'text',
                    required: false,
                    sectionId: 'license-meta-data',
                    value: '',
                    disabled: true,
                },
            },
            submitUrl: `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}/licenses/${licenseId}`,
            requestType: REQUEST_METHODS.PUT,
            onError: (message: string) => setErrorMessage(message),
            onSuccess: (message: string) => setSuccessMessage(message),
            submitButton: {
                name: 'Update',
                type: BUTTON_TYPES.PRIMARY_INVERSE,
                successMessage: 'Your license has been updated successfully.',
            },
        };
        setFormProps(formProps);
    };

    // Fetch licenses from server
    const getLicense = async () => {
        const licensesEndpoint = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}/licenses/${licenseId}`;

        try {
            const token = store.get('token');
            const req = new APIRequester({ url: licensesEndpoint })
                .setMethod(REQUEST_METHODS.GET)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = (await res.json()) as LicenseResponse;
            transformResponse(resJson);
            return;
        } catch (err) {
            console.log(err);
            if (err.title) return setErrorMessage(err.title);
            return setErrorMessage(err.message);
        }
    };

    // Initiate license fetch only after components has mounted
    useEffect(() => {
        getLicense();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (redirectToInstructions)
        return <Redirect to={`/products/${productId}/versions/${versionId}/licenses/${licenseId}/instructions`} />;
    return (
        <Layout
            title={`License View`}
            successMessage={successMessage ? successMessage : ''}
            errorMessage={errorMessage ? errorMessage : ''}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
        >
            {formProps.sections ? <PrimaryForm {...formProps} /> : undefined}
        </Layout>
    );
};

export default ViewLicense;
