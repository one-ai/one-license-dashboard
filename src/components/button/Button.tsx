import React, { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import styles from "./Button.module.scss";

interface Props {
  fullWidth?: boolean;
}

export const PrimaryButton: FunctionComponent<Props> = (props) => {
  const fullWidth = props.fullWidth;
  return (
    <Button
      className={[styles.primaryButton, fullWidth ? styles.fullWidth : ""].join(
        " "
      )}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
