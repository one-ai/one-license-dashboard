import React, { FunctionComponent, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { List } from '../list/List';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';
import { ListItem, ListProps } from '../list/List';

interface ResponseVersion {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    name: string;
}

export const ViewVersionList: FunctionComponent = props => {
    const [redirectToAdd, setRedirectToAdd] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState('');
    const { productId } = useParams();
    const [versionList, setVersionList] = useState({
        entityName: 'version',
    } as ListProps);

    const addVersionButton = {
        name: 'Add new version',
        onClick: () => setRedirectToAdd(1),
    };

    const transformResponse = (versions: ResponseVersion[]) => {
        const versionList: ListProps = {
            items: [] as ListItem[],
            entityName: 'version',
        } as ListProps;

        versions.map(version => {
            versionList.items!.push({
                id: version._id,
                name: version.name,
                ...version,
                buttons: {
                    primaryButton: {
                        name: 'Liecenses',
                        link: `/products/${productId}/versions/${version._id}/licenses`,
                    },
                    secondaryButton: {
                        name: 'View',
                        link: `/products/${productId}/versions/${version._id}`,
                    },
                },
            });
            return undefined;
        });
        setVersionList(versionList);
    };

    // Fetch versions from server
    const getVersions = async () => {
        const versionsEndpoint = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions`;

        try {
            const token = store.get('token');
            const req = new APIRequester({ url: versionsEndpoint })
                .setMethod(REQUEST_METHODS.GET)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = (await res.json()) as ResponseVersion[];
            resJson.reverse();
            transformResponse(resJson);
            setInitialized(true);
            return;
        } catch (err) {
            console.log(err);
            if (err.title) return setError(err.title);
            return setError(err.message);
        }
    };

    // Initiate version fetch only after components has mounted
    useEffect(() => {
        getVersions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (redirectToAdd) return <Redirect to={`/products/${productId}/versions/add`} />;

    return (
        <Layout title="Version List" primaryButton={addVersionButton} initialized={initialized} errorMessage={error}>
            <List {...versionList} />
        </Layout>
    );
};

export default ViewVersionList;
