import {endpointUrl, getData, postData, putData} from "./api";
import Cookies from 'js-cookie';

export const listOwner =  async (body) => {
    return await postData(`/ceo/getOwnerShips`, body, undefined,  endpointUrl.BUILDING_URL)
}
export const updateOwner = async (body) => {
    return await putData(`/ceo/UpdateOwnerShip`, body, endpointUrl.BUILDING_URL, undefined);
}
export const addOwner =  async (body) => {
    return await postData(`/ceo/addOwnerShip`, body, undefined, endpointUrl.BUILDING_URL)
}
export const getOwnerShip = async (id) => {
   return await getData(`/ceo/GetOwnerShipById/${id}`, endpointUrl.BUILDING_URL);
}
export const getOwnerShipPostMethod =  async (body) => {
    return await postData(`/resident/GetOwnerShipById`, body, undefined, endpointUrl.BUILDING_URL)
}

export const getAllResident = async () => {
    return await getData('/ceo/get-resident-payments', endpointUrl.BUILDING_URL);
}