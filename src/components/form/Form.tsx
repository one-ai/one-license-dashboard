import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styles from './Form.module.scss';
import { PrimaryButton } from '../button/Button';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface FormProps {
    sections: {
        [id: string]: {
            name: string;
            description: string;
        };
    };
    fields: {
        [id: string]: {
            name: string;
            type: string;
            required: boolean;
            sectionId: string;
            value: any;
        };
    };
    submitUrl: string;
    onSuccess: (state: number) => void;
    onError: (message: string) => void;
}

export const PrimaryForm: FunctionComponent<FormProps> = props => {
    const [fields, setFields] = useState(props.fields);
    const sections = props.sections;
    const onSuccess = props.onSuccess;
    const onError = props.onError;
    const [processing, setProcessing] = useState(false);
    const submitUrl = props.submitUrl;

    const onChange = (e: React.ChangeEvent<FormControlElement>) => {
        e.preventDefault();
        setFields({
            ...fields,
            [e.target.name]: { ...fields[e.target.name], value: e.target.value },
        });
    };

    const validateForm = async () => {
        Object.keys(fields).map(fieldId => {
            if (!fields[fieldId].value && fields[fieldId].required)
                throw new Error(`Please enter a valid ${fields[fieldId].name}`);
        });
    };

    const onClick = async () => {
        try {
            setProcessing(true);
            onSuccess(0);
            onError('');

            await validateForm();
            const body: { [key: string]: any } = {};
            Object.keys(fields).map(fieldId =>
                fields[fieldId].value ? (body[fieldId] = fields[fieldId].value) : undefined,
            );
            const token = store.get('token');
            const req = new APIRequester({ url: submitUrl })
                .setMethod(REQUEST_METHODS.POST)
                .setBody(body)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = await res.json();

            console.log(resJson);

            onSuccess(1);
            setProcessing(false);
        } catch (err) {
            setProcessing(false);
            console.log(err);
            if (err.title) return onError(err.title);
            return onError(err.message);
        }
    };

    return (
        <>
            {Object.keys(sections).map(sectionId => {
                return (
                    <>
                        <Row>
                            <Col md={6} xs={12}>
                                <div className={styles.sectionName}>{sections[sectionId].name}</div>
                                <div className={styles.sectionDescription}>{sections[sectionId].description}</div>
                            </Col>
                            <Col md={6} xs={12}>
                                {Object.keys(fields).map(fieldId => {
                                    return fields[fieldId].sectionId === sectionId ? (
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>{fields[fieldId].name}</Form.Label>
                                                <Form.Control
                                                    name={fieldId}
                                                    type={fields[fieldId].type}
                                                    value={fields[fieldId].value}
                                                    onChange={e => onChange(e)}
                                                />
                                            </Form.Group>
                                        </Form>
                                    ) : undefined;
                                })}
                            </Col>
                        </Row>
                        <hr />
                    </>
                );
            })}
            <Row>
                <Col md={6} xs={0}></Col>
                <Col md={6} xs={12}>
                    <PrimaryButton processing={processing} onClick={onClick} fullWidth>
                        Create
                    </PrimaryButton>
                </Col>
            </Row>
        </>
    );
};

export default PrimaryForm;
