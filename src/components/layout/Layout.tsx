import React, { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Layout.module.scss";
import config from "../../config";

export const Layout: FunctionComponent = (props) => {
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
    </Container>
  );
};

export default Layout;
