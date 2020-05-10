import React, { FunctionComponent, useState, ReactNode } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styles from './Form.module.scss';
import { PrimaryButton, BUTTON_TYPES } from '../button/Button';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface Field {
    name: string;
    type: 'text' | 'textarea' | 'select' | 'number';
    options?: { id: string; name: string; value: string; default?: boolean }[];
    required: boolean;
    sectionId: string;
    value: string | number;
    disabled?: boolean;
    send?: boolean;
    dependsOn?: {
        id: string;
        targetValues: (string | number)[];
    };
}

export interface FormProps {
    sections: {
        [id: string]: {
            name: string;
            description: string;
        };
    };
    fields: {
        [id: string]: Field;
    };
    submitUrl: string;
    requestType: REQUEST_METHODS;
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
    children?: ReactNode;
    submitButton: {
        name: string;
        type: BUTTON_TYPES;
        successMessage: string;
    };
}

export const PrimaryForm: FunctionComponent<FormProps> = (props: FormProps) => {
    const [fields, setFields] = useState(props.fields);
    const sections = props.sections;
    const onSuccess = props.onSuccess;
    const onError = props.onError;
    const [processing, setProcessing] = useState(false);
    const submitUrl = props.submitUrl;
    const submitButtonText = props.submitButton ? props.submitButton.name : 'Submit';
    const submitButtonType = props.submitButton ? props.submitButton.type : BUTTON_TYPES.PRIMARY;
    const requestType = props.requestType ? props.requestType : REQUEST_METHODS.POST;
    const successMessage = props.submitButton.successMessage;

    const onChange = (e: React.ChangeEvent<FormControlElement>): void => {
        e.preventDefault();
        setFields({
            ...fields,
            [e.target.name]: { ...fields[e.target.name], value: e.target.value },
        });
    };

    const validateForm = (): void => {
        Object.keys(fields).map(fieldId => {
            if (!fields[fieldId].value && fields[fieldId].required)
                throw new Error(`Please enter a valid ${fields[fieldId].name}`);
            return undefined;
        });
    };

    const needInRequestBody = (fieldId: string): boolean => {
        console.log('Field id = ' + fieldId);
        const dependsOnOtherFields = fields[fieldId].dependsOn ? true : false;
        console.log('dependsOnOtherFields = ' + dependsOnOtherFields);
        if (!dependsOnOtherFields) return true;
        const dependeeField = fields[fieldId].dependsOn?.id;
        console.log('dependeeField = ' + dependeeField);
        const requiredValues = fields[fieldId].dependsOn?.targetValues;
        console.log('requiredValues = ' + requiredValues);
        const dependeeValue = fields[dependeeField!].value;
        console.log('dependeeValue = ' + dependeeValue);
        console.log(requiredValues!.indexOf(dependeeValue) > -1);
        if (requiredValues!.indexOf(dependeeValue) > -1) return true;
        else return false;
    };

    const onClick = async (): Promise<void> => {
        try {
            setProcessing(true);
            onSuccess('');
            onError('');

            await validateForm();
            const body: { [key: string]: any } = {};
            Object.keys(fields).map(fieldId => {
                if (fields[fieldId].value && needInRequestBody(fieldId)) body[fieldId] = fields[fieldId].value;
                return undefined;
            });
            Object.keys(fields).map(fieldId => (fields[fieldId].send === false ? delete body[fieldId] : undefined));
            const token = store.get('token');
            const req = new APIRequester({ url: submitUrl })
                .setMethod(requestType)
                .setBody(body)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = await res.json();

            console.log(resJson);

            onSuccess(successMessage ? successMessage : 'Success!');
            setProcessing(false);

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } catch (err) {
            setProcessing(false);
            console.log(err);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            if (err.title) return onError(err.title);
            return onError(err.message);
        }
    };

    const getFormField = (fieldId: string, field: Field) => {
        if (field.dependsOn && !field.dependsOn.targetValues.includes(fields[field.dependsOn.id].value)) return;

        if (['text', 'textarea', 'number'].includes(field.type)) {
            return (
                <>
                    <Form.Label>{field.name}</Form.Label>
                    <Form.Control
                        name={fieldId}
                        type={field.type}
                        value={field.value}
                        onChange={e => onChange(e)}
                        disabled={field.disabled}
                    />
                </>
            );
        } else if (field.type === 'select') {
            return (
                <>
                    <Form.Label>{field.name}</Form.Label>
                    <Form.Control as="select" name={fieldId} onChange={e => onChange(e)} value={field.value}>
                        {field.options!.map(option => (
                            <option value={option.id} key={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Control>
                </>
            );
        }
    };

    return (
        <>
            {Object.keys(sections).map(sectionId => {
                return (
                    <div key={sectionId}>
                        <Row>
                            <Col md={6} xs={12}>
                                <div className={styles.sectionName}>{sections[sectionId].name}</div>
                                <div className={styles.sectionDescription}>{sections[sectionId].description}</div>
                            </Col>
                            <Col md={6} xs={12}>
                                {Object.keys(fields).map(fieldId => {
                                    return fields[fieldId].sectionId === sectionId ? (
                                        <Form key={`${sectionId}-${fieldId}`}>
                                            <Form.Group>{getFormField(fieldId, fields[fieldId])}</Form.Group>
                                        </Form>
                                    ) : undefined;
                                })}
                            </Col>
                        </Row>
                        <hr />
                    </div>
                );
            })}
            <Row>
                <Col md={6} xs={0}></Col>
                <Col md={6} xs={12}>
                    <PrimaryButton processing={processing} onClick={onClick} fullWidth type={submitButtonType}>
                        {submitButtonText}
                    </PrimaryButton>
                </Col>
            </Row>
        </>
    );
};

export default PrimaryForm;
