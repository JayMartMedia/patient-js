import { API_URI } from '../constants/uris';

const Rest = {
    delete : async (type, id) => {
        const url = API_URI+"/"+type+"/"+id;
        return await fetch(url, {method: 'DELETE'})
            .then(response => response.json());
    },
    get : async (type, id = '') => {
        const url = API_URI+"/"+type+"/"+id;
        return await fetch(url, {method: 'GET'})
            .then(response => response.json());
    },
    post : async (type, object) => {
        const url = API_URI+"/"+type+"/";
        return await fetch(url, 
            {
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST'
            })
            .then(response =>  response.json());
    },
    put : async (type, object) => {
        const url = API_URI+'/'+type+'/'+object['id'];
        return await fetch (url, 
            {
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'PUT'
            })
            .then(response => response.json())
    },
}

export {Rest};