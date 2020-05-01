import React, { FunctionComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './List.module.scss';
import { PrimaryButtonInverse, SecondaryInverseButton } from '../button/Button';

interface Props {
    ids: string[];
    keys: string[];
    items: string[][];
    buttons?: {
        primaryButton?: {
            name: string;
            link: string;
        };
        secondaryButton?: {
            name: string;
            link: string;
        };
    };
}

export const List: FunctionComponent<Props> = props => {
    const ids = props.ids;
    // const keysConfig = props.keys;
    const itemsConfig = props.items;
    const primaryButtonConfig = props.buttons?.primaryButton;
    const secondaryButtonConfig = props.buttons?.secondaryButton;

    const itemsRows = itemsConfig.map((itemConfig, i) => {
        return (
            <Row className={styles.listItem} key={`${ids[i]}`}>
                {itemConfig.map((data, j) => {
                    return <Col key={`${ids[i]}${j}`}>{data}</Col>;
                })}
                <Col className={styles.buttonSpace}>
                    {secondaryButtonConfig ? (
                        <SecondaryInverseButton small>{secondaryButtonConfig.name}</SecondaryInverseButton>
                    ) : (
                        ''
                    )}{' '}
                    {primaryButtonConfig ? (
                        <PrimaryButtonInverse small>{primaryButtonConfig.name}</PrimaryButtonInverse>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
        );
    });

    return <div className={styles.list}>{itemsRows}</div>;
};

export default List;
