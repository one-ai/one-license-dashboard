import React, { FunctionComponent } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import styles from './Button.module.scss';

interface Props {
    fullWidth?: boolean;
    right?: boolean;
    small?: boolean;
    onClick?: () => void;
    processing?: boolean;
    hoverEffect?: boolean;
}

export const PrimaryButton: FunctionComponent<Props> = props => {
    const fullWidth = props.fullWidth;
    const right = props.right;
    const small = props.small;
    const onClick = props.onClick;
    const processing = props.processing;
    const hoverEffect = props.hoverEffect;
    const spinner = processing ? <Spinner animation="grow" size="sm" /> : undefined;

    return (
        <Button
            className={[
                styles.primaryButton,
                fullWidth ? styles.fullWidth : undefined,
                right ? styles.floatRight : undefined,
                hoverEffect ? styles.hoverEffect : undefined,
            ].join(' ')}
            size={small ? 'sm' : undefined}
            onClick={onClick}
            disabled={processing ? true : false}
        >
            {spinner} {props.children}
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
