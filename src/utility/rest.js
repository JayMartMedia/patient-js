import { API_URI } from '../constants/uris';

const Rest = {
    delete : async (type, id) => {
        const url = API_URI+"/"+type+"/"+id;
        try{
            return await fetch(url, {method: 'DELETE'});
        } catch (error) {
            console.error(error)
        }
    },
    get : async (type, id = '') => {
        const url = API_URI+"/"+type+"/"+id;
        try{
            return await fetch(url, {method: 'GET'})
                .then(response => response.json());
        } catch (error) {
            console.error(error)
        }
    },
    post : async (type, object) => {
        const url = API_URI+"/"+type+"/";
        try{
            return await fetch(url, 
                {
                    body: JSON.stringify(object),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST'
                })
        } catch (error) {
            console.error(error)
        }
    },
    put : async (type, object) => {
        const url = API_URI+'/'+type+'/'+object['id'];
        try{
            return await fetch (url, 
                {
                    body: JSON.stringify(object),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'PUT'
                })
        } catch (error) {
            console.error(error)
        }
    },
}

export {Rest};