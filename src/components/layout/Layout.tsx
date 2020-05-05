import React, { FunctionComponent, ReactNode } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import styles from './Layout.module.scss';
import { PrimaryNavbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';
import { PrimaryButton } from '../button/Button';

interface Props {
    title: string;
    primaryButton?: {
        name: string;
        onClick: () => void;
    };
    successMessage?: string;
    errorMessage?: string;
    initialized?: boolean;
    children?: ReactNode;
}

export const TitleBar: FunctionComponent<Props> = (props: Props) => {
    const title = props.title;
    const primaryButton = props.primaryButton;
    return (
        <Container className={styles.titleBar} fluid>
            <Container>
                <Row>
                    <Col md={6} xs={12}>
                        <div>{title}</div>{' '}
                    </Col>
                    <Col className={styles.buttonSpace} md={6} xs={12}>
                        {primaryButton ? (
                            <PrimaryButton onClick={primaryButton.onClick} small>
                                {' '}
                                {primaryButton.name}
                            </PrimaryButton>
                        ) : undefined}
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export const Layout: FunctionComponent<Props> = (props: Props) => {
    const title = props.title;
    const successMessage = props.successMessage;
    const errorMessage = props.errorMessage;
    const primaryButton = props.primaryButton;

    const alert = successMessage ? (
        <Alert variant="success">{successMessage}</Alert>
    ) : errorMessage ? (
        <Alert variant="danger">{errorMessage}</Alert>
    ) : undefined;

    return (
        <Container className={styles.mainContainer} fluid>
            <div className={styles.layoutBody}>
                <PrimaryNavbar />
                <TitleBar title={title} primaryButton={primaryButton} />
                <Container className={styles.navContainer}>
                    {alert}
                    <Row className={styles.simpleRow}>
                        <Col className={styles.children}>{props.children}</Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </Container>
    );
};

export default Layout;
