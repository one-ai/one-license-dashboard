import React, { FunctionComponent, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { List } from '../list/List';
import { APIRequester, REQUEST_METHODS } from '../../helpers/apiRequester';
import store from 'store';
import { ListItem, ListProps } from '../list/List';

interface ResponseLicense {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    name: string;
}

export const ViewLicenseList: FunctionComponent = props => {
    const [redirectToAdd, setRedirectToAdd] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState('');
    const { productId, versionId } = useParams();
    const [licenseList, setLicenseList] = useState({
        entityName: 'license',
    } as ListProps);

    const addLicenseButton = {
        name: 'Add new license',
        onClick: () => setRedirectToAdd(1),
    };

    const transformResponse = (licenses: ResponseLicense[]) => {
        const licenseList: ListProps = {
            items: [] as ListItem[],
            entityName: 'license',
        } as ListProps;

        licenses.map(license => {
            licenseList.items!.push({
                id: license._id,
                name: license.name,
                ...license,
                buttons: {
                    secondaryButton: {
                        name: 'View',
                        link: `/products/${productId}/versions/${versionId}/licenses/${license._id}`,
                    },
                },
            });
            return undefined;
        });
        setLicenseList(licenseList);
    };

    // Fetch licenses from server
    const getLicenses = async () => {
        const licensesEndpoint = `${process.env.REACT_APP_API_GATEWAY}/api/v1/products/${productId}/versions/${versionId}/licenses`;

        try {
            const token = store.get('token');
            const req = new APIRequester({ url: licensesEndpoint })
                .setMethod(REQUEST_METHODS.GET)
                .setHeaders({
                    Authorization: `Bearer ${token}`,
                })
                .request();
            const res = await req;
            const resJson = (await res.json()) as ResponseLicense[];
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

    // Initiate license fetch only after components has mounted
    useEffect(() => {
        getLicenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (redirectToAdd) return <Redirect to={`/products/${productId}/versions/${versionId}/licenses/add`} />;

    return (
        <Layout title="License List" primaryButton={addLicenseButton} initialized={initialized} errorMessage={error}>
            <List {...licenseList} />
        </Layout>
    );
};

export default ViewLicenseList;
