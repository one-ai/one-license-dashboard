import React, { FunctionComponent, ReactNode } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './List.module.scss';
import { PrimaryButton, BUTTON_TYPES } from '../button/Button';

export interface ListItem {
    id: string;
    name: string;
    [key: string]: any;
    buttons?: {
        [type: string]: {
            name: string;
            link: string;
        };
    };
}

export interface ListProps {
    items?: ListItem[];
    children?: ReactNode;
    entityName: string;
}

export const List: FunctionComponent<ListProps> = (props: ListProps) => {
    const items = props.items;
    const entityName = props.entityName;

    if (!items || !items?.length)
        return (
            <Row>
                <Col className="text-center mt-5">
                    You do not have any {entityName}s. Please add {entityName}s to view them here.
                </Col>
            </Row>
        );

    const itemsRows = items.map(item => {
        return (
            <Row className={styles.listItem} key={item.id}>
                <Col key={`${item.id}-name`}>{item.name}</Col>
                <Col className={styles.buttonSpace}>
                    {item.buttons && item.buttons.secondaryButton ? (
                        <PrimaryButton
                            small
                            redirectLink={item.buttons.secondaryButton.link}
                            type={BUTTON_TYPES.SECONDARY_INVERSE}
                        >
                            {item.buttons.secondaryButton.name}
                        </PrimaryButton>
                    ) : (
                        ''
                    )}{' '}
                    {item.buttons && item.buttons.primaryButton ? (
                        <PrimaryButton
                            small
                            redirectLink={item.buttons.primaryButton.link}
                            type={BUTTON_TYPES.PRIMARY_INVERSE}
                        >
                            {item.buttons.primaryButton.name}
                        </PrimaryButton>
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
