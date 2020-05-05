import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup, Alert } from 'react-bootstrap';
import { FullLayout } from '../layout/FullLayout';
import styles from './Register.module.scss';
import { PrimaryButton, SecondaryInverseButton } from '../button/Button';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const Register: FunctionComponent = props => {
    const rawFields: { [key: string]: string } = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [errorMessage, setErrorMessage] = useState('');
    const [fields, setFields] = useState(rawFields);
    const [processing, setProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const onChange = (e: React.ChangeEvent<FormControlElement>) => {
        e.preventDefault();
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = async () => {
        Object.keys(fields).map(fieldId => {
            if (!fields[fieldId]) throw new Error(`Please enter a valid ${fieldId}`);
            return undefined;
        });
        if (fields['password'] !== fields['confirmPassword']) throw new Error('Passwords do not match. Please verify.');
    };

    const onClick = async () => {
        try {
            setProcessing(true);
            setErrorMessage('');
            await validateForm();
            const fieldsToSend = Object.assign(fields);
            delete fieldsToSend['confirmPassword'];
            const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/register/basic`;
            const req = new APIRequester({ url: submitUrl }).setMethod(REQUEST_METHODS.POST).setBody(fields).request();
            const res = await req;
            await res.json();
            setSuccessMessage('You have been registered successfully. Please proceed to login.');
            setProcessing(false);
        } catch (err) {
            setProcessing(false);
            console.log(err);
            return setErrorMessage(err.message);
        }
    };

    const errorAlert = errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : undefined;

    const successAlert = successMessage ? <Alert variant="success">{successMessage}</Alert> : undefined;

    return (
        <FullLayout>
            <div className={styles.mainBox}>
                {errorAlert}
                {successAlert}
                <Form>
                    <Form.Group>
                        <Form.Control
                            name="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            onChange={onChange}
                            value={fields.firstName}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            onChange={onChange}
                            value={fields.lastName}
                        />
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                onChange={onChange}
                                value={fields.email}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={onChange}
                            value={fields.password}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter your password again to confirm"
                            onChange={onChange}
                            value={fields.confirmPassword}
                        />
                    </Form.Group>
                    <Form.Group>
                        <PrimaryButton onClick={onClick} fullWidth={true} processing={processing}>
                            Register
                        </PrimaryButton>
                    </Form.Group>
                    <Form.Group className={styles.buttonBox}>
                        <Link to="/login">
                            <SecondaryInverseButton fullWidth={true}>
                                Already registered. Back to login.
                            </SecondaryInverseButton>
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        </FullLayout>
    );
};

export default Register;
