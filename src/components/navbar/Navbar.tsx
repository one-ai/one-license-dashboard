import React, { FunctionComponent } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from './Navbar.module.scss';
import config from '../../config';

export const PrimaryNavbar: FunctionComponent = props => {
    return (
        <Navbar bg="dark" variant="dark" className={styles.primaryNavbar}>
            <Container className={styles.navContainer}>
                <Navbar.Brand>{config.siteTitle}</Navbar.Brand>
                <div className="mr-auto"></div>
                <Nav>
                    <Nav.Link href="/products">Home</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default PrimaryNavbar;
