import requests from "../components/requests";

export const getProfiles = async() => {
    return await requests.makeRequest(requests.apiRoutes.profiles);
};

export const getCollections = async () => {
    return await requests.makeRequest(requests.apiRoutes.collections);
}

export const getCollectionsByCriteria = async(queryString) => {
    return await requests.makeRequest(requests.apiRoutes.collectionsByCriteria, 'GET', undefined, queryString);
}

export const getProfilesByCriteria = async(queryString) => {
    return await requests.makeRequest(requests.apiRoutes.profileByCriteria, 'GET', undefined, queryString);
}

export const createCollection = async(payload) => {
    return await requests.makeRequest(requests.apiRoutes.collections, 'POST', payload)
}

