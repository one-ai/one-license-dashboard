import React, { FunctionComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styles from './Form.module.scss';
import { PrimaryButton } from '../button/Button';

export interface FormProps {
    sections: {
        id: string;
        name: string;
        description: string;
    }[];
    fields: {
        name: string;
        type: string;
        required: boolean;
        sectionId: string;
    }[];
}

export const PrimaryForm: FunctionComponent<FormProps> = props => {
    const fields = props.fields;
    const sections = props.sections;
    return (
        <>
            {sections.map(section => {
                return (
                    <>
                        <Row>
                            <Col md={6} xs={12}>
                                <div className={styles.sectionName}>{section.name}</div>
                                <div className={styles.sectionDescription}>{section.description}</div>
                            </Col>
                            <Col md={6} xs={12}>
                                {fields.map(field => {
                                    if (field.sectionId === section.id) {
                                        return (
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label>{field.name}</Form.Label>
                                                    <Form.Control type={field.type} />
                                                </Form.Group>
                                            </Form>
                                        );
                                    }
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
                    <PrimaryButton fullWidth>Create</PrimaryButton>
                </Col>
            </Row>
        </>
    );
};

export default PrimaryForm;
