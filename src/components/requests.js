import {mainSource} from "../config/sources";

const apiRoutes = {
    collections: 'collections',
    profiles: 'profiles',
    cards: 'cards',
    collectionsByCriteria: `collections/criteria`,
    options: 'options',
    profileByCriteria: 'profiles/criteria',
    cardsByCriteria: 'cards/criteria',
    statuses: 'statuses'


}



function constructOptions(method, payload) {
    let options = {};
    if(method ==='GET') return options;
    else if(method !== 'DELETE') {
        options['body'] = JSON.stringify(payload);
        options['headers'] = {
            'Content-Type': 'application/json'
        };
    }
    options['method'] = method;

    return options;

}

async function makeRequest(route, method = 'GET', payload = undefined, queryString = '') {

            const response = await fetch(`${mainSource}${route}${queryString}`, constructOptions(method, payload));
    return await response.json();

}

export default {apiRoutes, makeRequest};

