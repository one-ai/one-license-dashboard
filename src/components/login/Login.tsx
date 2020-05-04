import React, { FunctionComponent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, InputGroup, Alert } from 'react-bootstrap';
import { FullLayout } from '../layout/FullLayout';
import styles from './Login.module.scss';
import { PrimaryButton, SecondaryInverseButton } from '../button/Button';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const Login: FunctionComponent = props => {
    const rawFields: { [key: string]: string } = {
        email: '',
        password: '',
    };
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fields, setFields] = useState(rawFields);

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
        });
    };

    const onClick = async () => {
        try {
            setErrorMessage('');
            await validateForm();
            const submitUrl = `${process.env.REACT_APP_API_GATEWAY}/api/v1/login/basic`;
            const req = new APIRequester({ url: submitUrl }).setMethod(REQUEST_METHODS.POST).setBody(fields).request();
            const res = await req;
            const resJson: { token: string } = await res.json();
            const token = resJson.token;
            store.set('token', resJson.token);
            setToken(token);
        } catch (err) {
            console.log(err);
            if (err.title) return setErrorMessage(err.title);
            return setErrorMessage(err.message);
        }
    };

    const errorAlert = errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : undefined;

    if (token) return <Redirect to="/products" />;

    return (
        <FullLayout>
            <div className={styles.mainBox}>
                {errorAlert}
                <Form>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={fields.email}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={fields.password}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <PrimaryButton onClick={onClick} fullWidth={true}>
                            Login
                        </PrimaryButton>
                    </Form.Group>
                    <Form.Group className={styles.buttonBox}>
                        <Link to="/register">
                            <SecondaryInverseButton fullWidth={true}>Register</SecondaryInverseButton>
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        </FullLayout>
    );
};

export default Login;
