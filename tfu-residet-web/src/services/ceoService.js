import {endpointUrl, getData, postData, putData} from "./api";

export const listOwner =  async (body) => {
    return await postData(`/ceo/getOwnerShips`, body, endpointUrl.BUILDING_URL)
}
export const updateOwner = async (body) => {
    return await putData(`/ceo/UpdateOwnerShip`, body, endpointUrl.BUILDING_URL)
}
export const addOwner =  async (body) => {
    return await postData(`/ceo/addOwnerShip`, body, endpointUrl.BUILDING_URL)
}
export const getOwnerShip = async (id) => {
   return await getData(`/ceo/GetOwnerShipById/${id}`, endpointUrl.BUILDING_URL);
}
export const getOwnerShipPostMethod =  async (body) => {
    return await postData(`/ceo/GetByOwnershipId`, body, endpointUrl.BUILDING_URL)
}
