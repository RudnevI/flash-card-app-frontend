import {mainSource} from "../config/sources";

const apiRoutes = {
    collections: 'collections',
    profiles: 'profiles',
    cards: 'cards',
    collectionsByCriteria: `collections/criteria`


}



function constructOptions(method, payload) {
    let options = {};
    if(method ==='GET') return options;
    else if(method !== 'DELETE') options['payload'] = JSON.stringify(payload);
    options['method'] = method;
    return options;

}

async function makeRequest(route, method = 'GET', payload = undefined, queryString = '') {


            const response = await fetch(`${mainSource}${route}${queryString}`, constructOptions(method, payload));
    return await response.json();

}

export default {apiRoutes, makeRequest};

