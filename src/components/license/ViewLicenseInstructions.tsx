import React, { FunctionComponent } from 'react';
import { Layout } from '../layout/Layout';
import { useParams } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties';
const REACT_APP_API_GATEWAY = process.env.REACT_APP_API_GATEWAY;

export const ViewLicenseInstructions: FunctionComponent = props => {
    const { productId, versionId, licenseId } = useParams();

    return (
        <Layout title={`License Use Instructions`}>
            <Row>
                <Col>
                    <ul>
                        <li>
                            One Licenses clients can be found here:{' '}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://github.com/one-ai/one-license-client"
                            >
                                https://github.com/one-ai/one-license-client
                            </a>
                        </li>
                        <li>Use the following JSON code in one of the One License clients.</li>
                    </ul>
                    <SyntaxHighlighter language="javascript" style={dark}>
                        {`{
    "server_url": "${REACT_APP_API_GATEWAY}/api/v1",
    "product_id": "${productId}",
    "version_id": "${versionId}",
    "license_id": "${licenseId}",
}`}
                    </SyntaxHighlighter>
                    <Alert variant="warning">
                        <strong>Warning!</strong>
                        <br />
                        <br />
                        <p>
                            Your software needs to be obfuscated and/or be converted into a simple binary before
                            shipping. Without it, this licensing will make no sense as it can be easily removed from
                            your code. Below are the libraries that is recommended if your codebase is in Python:
                        </p>
                        <p>
                            <ul>
                                <li>
                                    For obfuscation:
                                    <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href="https://pypi.org/project/pyarmor/"
                                    >
                                        {' '}
                                        Pyarmor
                                    </a>{' '}
                                    (with a paid license)
                                </li>
                                <li>
                                    For binarization:
                                    <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href="https://pypi.org/project/PyInstaller/"
                                    >
                                        {' '}
                                        PyInstaller
                                    </a>{' '}
                                </li>
                            </ul>
                        </p>
                    </Alert>
                    <p>Below are the descriptions of different options available for a license:</p>
                    <p>
                        <h4>Type</h4>
                        <ul>
                            <li>
                                <strong>Limited API calls</strong>
                                <br />
                                Can be used when you want your solution to be limited to number of API calls.
                                <br />
                                <br />
                            </li>
                            <li>
                                <strong>Time bound</strong>
                                <br />
                                Can be used when you want your solution to expire after some time.
                                <br />
                                <br />
                            </li>
                            <li>
                                <strong>Limited API calls + Time bound</strong>
                                <br />
                                Can be used when you want your solution to be both limited to number of API calls as
                                well as to expire after some time.
                                <br />
                                <br />
                            </li>
                        </ul>
                    </p>
                    <p>
                        <h4>Sync Strategy</h4>
                        <ul>
                            <li>
                                <strong>HTTP</strong>
                                <br />
                                When you want the One License Client to contact the One License Service via HTTP.
                                <br />
                                <br />
                            </li>
                            <li>
                                <strong>SFTP</strong>
                                <br />
                                When you want the One License Client to contact the One License Service via SFTP.
                                <br />
                                <br />
                            </li>
                        </ul>
                    </p>
                    <p>
                        <h4>Sync Interval</h4>
                        <ul>
                            <li>
                                <strong>At fixed interval</strong>
                                <br />
                                When you want One License Client to sync with One License server at regular intervals.
                                <Alert variant="danger">
                                    This method can be prone to frauds by making use of Virtual Machines. Therefore is
                                    is recommended that you use One License Thin Client with combination on One License
                                    Client and One License Server.
                                </Alert>
                            </li>
                            <li>
                                <strong>After every call</strong>
                                <br />
                                When you want One License Client to sync with One License server at every API call made
                                to your solution.
                                <br />
                                <br />
                            </li>
                        </ul>
                    </p>
                </Col>
            </Row>
        </Layout>
    );
};

export default ViewLicenseInstructions;
