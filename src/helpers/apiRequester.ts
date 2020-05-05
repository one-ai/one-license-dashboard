type KeyValuePair = { [key: string]: string };

export enum REQUEST_METHODS {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class APIRequester {
    private url: string;
    private headers: KeyValuePair = {};
    private method: string | 'GET' = 'GET';
    private body: KeyValuePair = {};
    private responsePlainText: string | undefined;
    private STATUS_CODE: number | undefined;
    private SUCCESS = false;
    private requestPromise: Promise<Response> | null = null;

    constructor(initialData: { url: string }) {
        this.url = initialData.url;
    }

    /**
     * Adds headers to request
     * @param headers - Key value pairs
     */
    setHeaders(headers: KeyValuePair): APIRequester {
        this.headers = headers;
        return this;
    }

    /**
     * Adds body to request
     * @param body - Key value pairs
     */
    setBody(body: KeyValuePair): APIRequester {
        this.body = body;
        return this;
    }

    /**
     * Add method to request
     * @param newMethod - REST method
     */
    setMethod(newMethod: REQUEST_METHODS): APIRequester {
        this.method = newMethod;
        return this;
    }

    /**
     * Make request
     * @param body - Key value pairs to send in body
     */
    request<T>(type: 'json' | 'form' = 'json'): APIRequester {
        if (type === 'json') this.headers['Content-Type'] = 'application/json';
        else if (type === 'form') this.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        this.requestPromise = fetch(this.url, {
            headers: this.headers,
            method: this.method,
            body:
                this.method === 'GET'
                    ? undefined
                    : type === 'json'
                    ? JSON.stringify(this.body)
                    : type === 'form'
                    ? this.generateFormData()
                    : undefined,
        });
        return this;
    }

    /**
     * Generate form body
     * @param body - Key value pairs to send in body
     */
    generateFormData(): URLSearchParams {
        const formData = new URLSearchParams();
        const keys = Object.keys(this.body);
        for (let i = 0; i < keys.length; i++) {
            formData.append(keys[i], this.body[keys[i]]);
        }
        return formData;
    }

    /**
     * Extract and return response body in JSON format
     */
    async json<T>(): Promise<T> {
        const res: Response | null = await this.requestPromise;

        if (res === null)
            // When response is empty
            throw new Error('fetch initialization failed');

        this.STATUS_CODE = res.status;
        this.responsePlainText = await res.text();

        if (this.STATUS_CODE !== 200 && this.responsePlainText) {
            // When request is not successful
            // We do not know if response is in JSON, so we check
            let errorJson: {
                status: number;
                title: string;
                description?: string;
            };
            try {
                errorJson = JSON.parse(this.responsePlainText) as {
                    status: number;
                    title: string;
                    description?: string;
                };
            } catch (err) {
                // We are confirmed response is not JSON
                throw new Error(this.responsePlainText);
            }
            throw new Error(`${errorJson.title}. ${errorJson.description ? errorJson.description : ''}`);
        } else if (this.STATUS_CODE !== 200)
            // When request is not successful
            throw new Error('Request status code not 200');

        this.SUCCESS = true;

        return (await JSON.parse(this.responsePlainText)) as T;
    }

    get statusCode() {
        return this.STATUS_CODE;
    }

    get success() {
        return this.SUCCESS;
    }
}
