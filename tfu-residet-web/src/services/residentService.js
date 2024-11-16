import {deleteData, endpointUrl, getData, postData, putData} from "./api";
import Cookies from "js-cookie";

export const getBuilding = async (residentId, buildingId) => {
   return await getData(`/apartment/resident/${residentId}`, endpointUrl.BUILDING_URL, {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
            'buildingPermalink':  buildingId,
          },);
}

export const getMemberInApartment = async (apartmentId, buildingId) => {
   return await getData(`/apartment/resident/details/${apartmentId}`, endpointUrl.BUILDING_URL);
}
export const addMemberInApartment = async (body) => {
   return await postData('/apartment/add-apartment-member', body, undefined, endpointUrl.BUILDING_URL);
}

export const saveBuilding = async (body, residentId) => {
    return await postData(`/apartment/resident/${residentId}`, body, undefined, endpointUrl.BUILDING_URL)
}
export const updateOwnerShip = async (body) => {
    return await putData(`/ceo/UpdateOwnerShip`, body, endpointUrl.BUILDING_URL)
}

export const deleteResident = async (data) => {
   return await postData(`/ceo/deleteResident`, data , endpointUrl.BUILDING_URL);
}
export const addResident  = async (data) => {
   return await postData(`/ceo/addResident`, data , endpointUrl.BUILDING_URL);
}
export const updateResident  = async (data) => {
   return await putData(`/ceo/updateResident`, data , endpointUrl.BUILDING_URL);
}