import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Button.module.scss';

interface Props {
    fullWidth?: boolean;
    right?: boolean;
    small?: boolean;
    onClick?: () => void;
}

export const PrimaryButton: FunctionComponent<Props> = props => {
    const fullWidth = props.fullWidth;
    const right = props.right;
    const small = props.small;
    const onClick = props.onClick;
    return (
        <Button
            className={[styles.primaryButton, fullWidth ? styles.fullWidth : '', right ? styles.floatRight : ''].join(
                ' ',
            )}
            size={small ? 'sm' : undefined}
            onClick={onClick}
        >
            {props.children}
        </Button>
    );
};

export const PrimaryButtonInverse: FunctionComponent<Props> = props => {
    const fullWidth = props.fullWidth;
    const right = props.right;
    const small = props.small;
    return (
        <Button
            className={[
                styles.primaryButtonInverse,
                fullWidth ? styles.fullWidth : '',
                right ? styles.floatRight : '',
            ].join(' ')}
            size={small ? 'sm' : undefined}
        >
            {props.children}
        </Button>
    );
};

export const SecondaryInverseButton: FunctionComponent<Props> = props => {
    const fullWidth = props.fullWidth;
    const right = props.right;
    const small = props.small;
    return (
        <Button
            variant="outline-secondary"
            className={[styles.secondaryButton, fullWidth ? styles.fullWidth : '', right ? styles.floatRight : ''].join(
                ' ',
            )}
            size={small ? 'sm' : undefined}
        >
            {props.children}
        </Button>
    );
};

export default PrimaryButton;
