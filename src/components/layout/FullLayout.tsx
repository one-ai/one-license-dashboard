import React, { FunctionComponent, ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Layout.module.scss';
import config from '../../config';
import { Footer } from '../footer/Footer';

interface Props {
    children?: ReactNode;
}

export const FullLayout: FunctionComponent = (props: Props) => {
    return (
        <Container className={styles.container} fluid>
            <Row className={styles.row}>
                <Col md={{ span: 4, offset: 4 }} xs={12} className={styles.logoBox}>
                    <h2>
                        <b>{config.siteTitle}</b>
                    </h2>
                    {config.siteTagLine}
                </Col>
            </Row>
            <Row className={styles.row}>
                <Col md={{ span: 4, offset: 4 }} xs={12}>
                    {props.children}
                </Col>
            </Row>
            <Footer bottomFix={true} inverse={true} />
        </Container>
    );
};

export default FullLayout;
