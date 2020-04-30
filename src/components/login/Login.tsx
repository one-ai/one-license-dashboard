import React, { FunctionComponent } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FullLayout } from "../layout/FullLayout";
import styles from "./Login.module.scss";
import { PrimaryButton } from "../button/Button";

export const Login: FunctionComponent = (props) => {
  return (
    <FullLayout>
      <div className={styles.mainBox}>
        <Form>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>
          <Form.Group className={styles.buttonBox}>
            <PrimaryButton fullWidth={true}>Login</PrimaryButton>
          </Form.Group>
        </Form>
      </div>
    </FullLayout>
  );
};

export default Login;
