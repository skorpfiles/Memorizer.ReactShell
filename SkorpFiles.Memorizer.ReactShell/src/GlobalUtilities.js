import { ApiHostUrl } from './GlobalConstants';

export async function CallApi(relativePath, method, accessToken, body) {
    const headers = {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,Access-Control-Allow-Headers,content-type, Authorization',
    }

    if (accessToken != null) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const init = {
        method: method,
        headers: headers
    };

    if (body != null) {
        init['body'] = body;
    }

    return await fetch(ApiHostUrl + relativePath, init);
}