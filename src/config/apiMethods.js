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

export const getCardsByCriteria = async(queryString) => {
    return await requests.makeRequest(requests.apiRoutes.cardsByCriteria, 'GET', undefined, queryString);
}

export const createCard = async(payload) => {
    return await requests.makeRequest(requests.apiRoutes.cards, 'POST', payload);
}

export const getStatuses = async() => {
    return await requests.makeRequest(requests.apiRoutes.statuses, 'GET');
}

export const updateCollection = async(payload) => {
    return await requests.makeRequest(requests.apiRoutes.collectionsByCriteria, 'PUT', payload)
}

export const updateCard = async(payload) => {
    return await requests.makeRequest(requests.apiRoutes.cardsByCriteria, 'PUT', payload);
}

export const deleteProfileByCriteria = async (queryString) => {
    return await requests.makeRequest(requests.apiRoutes.profileByCriteria, 'DELETE', undefined, queryString)
}

export const getStatusByCriteria = async(queryString) => {
    return await requests.makeRequest(requests.apiRoutes.statusesByCriteria, 'GET', undefined, queryString);
}

export const getOptionsByCriteria = async(queryString) => {
    return await requests.makeRequest(requests.apiRoutes.optionsByCriteria, 'GET', undefined, queryString);
}

export const deleteCardByCriteria = async (queryString) => {
    return await requests.makeRequest(requests.apiRoutes.cardsByCriteria, 'DELETE', undefined, queryString);
}

export const deleteCollectionByCriteria = async(queryString) => {
    return await requests.makeRequest(requests.apiRoutes.collectionsByCriteria, 'DELETE', undefined, queryString);
}