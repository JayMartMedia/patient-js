import { API_URI } from '../constants/uris';
import ITEM from '../constants/patientConstants';

import { Rest } from './rest';

const DELETE_JSON = {
    id: '654321',
    type: 'Person',
    first_name: 'John',
    last_name: 'Doe'
}

const GET_JSON = {
    type: 'Person',
    first_name: 'John',
    last_name: 'Doe'
}

const POST_JSON = {
    type: 'Person',
    first_name: 'John',
    last_name: 'Doe'
}

const PUT_JSON = {
    id: '123456',
    type: 'Person',
    first_name: 'John',
    last_name: 'Doe'
}


// mock fetch and create a watcher
const fetchWatcher = jest.fn((url, requestObj) => {})

global.fetch = (url, requestObj) => {
    fetchWatcher(url, requestObj);

    const method = requestObj.method; 

    let retval;
    if( method == 'DELETE' ) retval = DELETE_JSON;
    if( method == 'GET' ) retval = GET_JSON;
    if( method == 'POST' ) retval = POST_JSON;
    if( method == 'PUT' ) retval = PUT_JSON;

    return Promise.resolve({
        json: () => Promise.resolve(retval)
    })
};

describe ('Rest.js', () => {
    afterEach(() => {    
        jest.clearAllMocks();
    });

    it('returns the http_response of the delete fetch request', async () => {
        let http_response = await Rest.delete(ITEM.TYPE, DELETE_JSON['id']);
        expect(fetchWatcher).toHaveBeenCalledWith(
            API_URI+'/'+ITEM.TYPE+'/'+DELETE_JSON['id'],
            {method: 'DELETE'}
        );
        expect(http_response).toEqual(DELETE_JSON);
    });

    it('returns the http_response of the get fetch request', async () => {
        let http_response = await Rest.get(ITEM.TYPE);
        expect(fetchWatcher).toHaveBeenCalledWith(
            expect.any(String),
            {method: 'GET'}
        );
        expect(http_response).toEqual(GET_JSON);
    });

    it('returns the http_response of the post fetch request', async () => {
        let http_response = await Rest.post(ITEM.TYPE, POST_JSON);
        expect(fetchWatcher).toHaveBeenCalledWith(
            expect.any(String), 
            {
                body: JSON.stringify(POST_JSON),
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'POST'
            }
        );
        expect(http_response).toEqual(POST_JSON);
    });

    it('returns the http_response of the put fetch request', async () => {
        let http_response = await Rest.put(ITEM.TYPE, PUT_JSON);
        expect(fetchWatcher).toHaveBeenCalledWith(
            API_URI+'/'+ITEM.TYPE+'/'+PUT_JSON['id'],
            {
                body: JSON.stringify(PUT_JSON),
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'PUT'
            }
        );
        expect(http_response).toEqual(PUT_JSON);
    });


});