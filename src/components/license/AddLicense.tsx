import React, { FunctionComponent, useState } from 'react';
import { Layout } from '../layout/Layout';
import { PrimaryForm, FormProps } from '../form/Form';
import { useParams } from 'react-router-dom';
import { SYNC_STRATEGY, SYNC_TRIGGER, LICENSE_TYPE } from './ViewLicense';
import { REQUEST_METHODS } from '../../helpers/apiRequester';
import { BUTTON_TYPES } from '../button/Button';

export const AddLicense: FunctionComponent = props => {
    const successMessage = 'Your license has been created successfully. You can view it on the licenses page.';
    const [success, setSuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { productId, versionId } = useParams();
    const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}/licenses`;

    const formProps: FormProps = {
        sections: {
            'license-data': {
                name: 'License Data',
                description: 'These are required fields that perfectly describe your license',
            },
            'license-config': {
                name: 'License Configuration',
                description: 'These are fields help you create different licensing strategies',
            },
            'license-meta-data': {
                name: 'License Meta Data',
                description: 'These are optional fields that complement your license data.',
            },
        },
        fields: {
            name: {
                name: 'Name',
                type: 'text',
                required: true,
                sectionId: 'license-data',
                value: '',
            },
            description: {
                name: 'Description',
                type: 'textarea',
                required: true,
                sectionId: 'license-data',
                value: '',
            },
            type: {
                name: 'Type',
                type: 'select',
                required: true,
                sectionId: 'license-config',
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
                value: LICENSE_TYPE.NO_OF_API_CALLS,
            },
            activationDelay: {
                name: 'Activation Delay (seconds)',
                type: 'number',
                required: true,
                sectionId: 'license-config',
                value: 0,
            },
            activationCounterLimit: {
                name: 'Activation Counter Limit',
                type: 'number',
                required: true,
                sectionId: 'license-config',
                value: 0,
            },
            allowedApiCalls: {
                name: 'API call limit',
                type: 'number',
                required: false,
                sectionId: 'license-config',
                value: 0,
                dependsOn: {
                    id: 'type',
                    targetValues: [LICENSE_TYPE.NO_OF_API_CALLS, LICENSE_TYPE.TIME_BOUND_AND_API_CALLS],
                },
            },
            expiresAt: {
                name: 'License valid until (mm/dd/yyyy)',
                type: 'text',
                required: false,
                sectionId: 'license-config',
                value: '',
                dependsOn: {
                    id: 'type',
                    targetValues: [LICENSE_TYPE.TIME_BOUND, LICENSE_TYPE.TIME_BOUND_AND_API_CALLS],
                },
            },
            syncStrategy: {
                name: 'Sync Strategy',
                type: 'select',
                required: true,
                sectionId: 'license-config',
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
                value: SYNC_STRATEGY.HTTP,
            },
            syncTrigger: {
                name: 'Sync Trigger',
                type: 'select',
                required: true,
                sectionId: 'license-config',
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
                value: SYNC_TRIGGER.AFTER_INTERVAL,
            },
            syncInterval: {
                name: 'Sync Interval (seconds)',
                type: 'number',
                required: false,
                sectionId: 'license-config',
                value: 0,
                dependsOn: {
                    id: 'syncTrigger',
                    targetValues: [SYNC_TRIGGER.AFTER_INTERVAL],
                },
            },
            maxSyncRetries: {
                name: 'Max retries',
                type: 'number',
                required: false,
                sectionId: 'license-config',
                value: 1,
                dependsOn: {
                    id: 'syncTrigger',
                    targetValues: [SYNC_TRIGGER.AFTER_INTERVAL],
                },
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
        submitUrl,
        onError: (message: string) => setErrorMessage(message),
        onSuccess: (message: string) => setSuccess(message),
        requestType: REQUEST_METHODS.POST,
        submitButton: {
            name: 'Create',
            type: BUTTON_TYPES.PRIMARY,
            successMessage: 'Your licenses has been created successfully',
        },
    };

    return (
        <Layout
            title="Add New License"
            successMessage={success ? successMessage : ''}
            errorMessage={errorMessage ? errorMessage : ''}
        >
            <PrimaryForm {...formProps} />
        </Layout>
    );
};

export default AddLicense;
