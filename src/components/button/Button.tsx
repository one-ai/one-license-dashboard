import React, { FunctionComponent, ReactNode, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import styles from './Button.module.scss';
import { Redirect } from 'react-router-dom';

export enum BUTTON_TYPES {
    PRIMARY = 'primary',
    PRIMARY_INVERSE = 'primaryInverse',
    SECONDARY = 'secondary',
    SECONDARY_INVERSE = 'secondaryInverse',
    DANGER = 'danger',
    DANGER_INVERSE = 'dangerInverse',
    SUCCESS = 'success',
    SUCCESS_INVERSE = 'successInverse',
    WARNING = 'warning',
    WARNING_INVERSE = 'warningInverse',
}

interface Props {
    fullWidth?: boolean;
    right?: boolean;
    small?: boolean;
    onClick?: () => void;
    processing?: boolean;
    hoverEffect?: boolean;
    children?: ReactNode;
    redirectLink?: string;
    type?: BUTTON_TYPES;
}

export const PrimaryButton: FunctionComponent<Props> = (props: Props) => {
    const fullWidth = props.fullWidth;
    const right = props.right;
    const small = props.small;
    const onClick = props.onClick;
    const processing = props.processing;
    const hoverEffect = props.hoverEffect;
    const spinner = processing ? <Spinner animation="grow" size="sm" /> : undefined;
    const redirectLink = props.redirectLink;
    const [redirect, setRedirect] = useState(0);
    const buttonStyle: string = props.type ? props.type : BUTTON_TYPES.PRIMARY;

    if (redirect && redirectLink) return <Redirect to={redirectLink} />;

    return (
        <Button
            className={[
                styles[buttonStyle],
                fullWidth ? styles.fullWidth : undefined,
                right ? styles.floatRight : undefined,
                hoverEffect ? styles.hoverEffect : undefined,
            ].join(' ')}
            size={small ? 'sm' : undefined}
            onClick={redirectLink ? () => setRedirect(1) : onClick}
            disabled={processing ? true : false}
        >
            {spinner} {props.children}
        </Button>
    );
};

export const PrimaryButtonInverse: FunctionComponent<Props> = (props: Props) => {
    const fullWidth = props.fullWidth;
    const right = props.right;
    const small = props.small;
    const onClick = props.onClick;
    const redirectLink = props.redirectLink;
    const [redirect, setRedirect] = useState(0);

    if (redirect && redirectLink) return <Redirect to={redirectLink} />;

    return (
        <Button
            className={[
                styles.primaryButtonInverse,
                fullWidth ? styles.fullWidth : '',
                right ? styles.floatRight : '',
            ].join(' ')}
            onClick={redirectLink ? () => setRedirect(1) : onClick}
            size={small ? 'sm' : undefined}
        >
            {props.children}
        </Button>
    );
};

export const SecondaryInverseButton: FunctionComponent<Props> = (props: Props) => {
    const fullWidth = props.fullWidth;
    const right = props.right;
    const small = props.small;
    const onClick = props.onClick;
    const redirectLink = props.redirectLink;
    const [redirect, setRedirect] = useState(0);

    if (redirect && redirectLink) return <Redirect to={redirectLink} />;

    return (
        <Button
            variant="outline-secondary"
            className={[styles.secondaryButton, fullWidth ? styles.fullWidth : '', right ? styles.floatRight : ''].join(
                ' ',
            )}
            onClick={redirectLink ? () => setRedirect(1) : onClick}
            size={small ? 'sm' : undefined}
        >
            {props.children}
        </Button>
    );
};

export default PrimaryButton;
