import React, { FunctionComponent, ReactNode } from 'react';
import styles from './Footer.module.scss';
import config from '../../config';

interface Props {
    bottomFix?: boolean;
    inverse?: boolean;
    children?: ReactNode;
}

export const Footer: FunctionComponent<Props> = (props: Props) => {
    const bottomFix = props.bottomFix;
    const inverse = props.inverse;
    return (
        <div className={[styles.footer, bottomFix ? styles.bottomFix : '', inverse ? styles.inverse : ''].join(' ')}>
            {config.footerText}{' '}
            <a target="_blank" rel="noopener noreferrer" href={config.authorSite}>
                {config.author}
            </a>{' '}
            {config.footerEndingEmoji}
        </div>
    );
};

export default Footer;
