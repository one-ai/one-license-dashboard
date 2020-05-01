import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { FullLayout } from '../layout/FullLayout';
import styles from './Register.module.scss';
import { PrimaryButton, SecondaryInverseButton } from '../button/Button';

export const Register: FunctionComponent = props => {
    return (
        <FullLayout>
            <div className={styles.mainBox}>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter your first name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter your last name" />
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="email" placeholder="Enter your email address" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder="Enter your password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder="Enter your password again to confirm" />
                    </Form.Group>
                    <Form.Group>
                        <PrimaryButton fullWidth={true}>Register</PrimaryButton>
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
