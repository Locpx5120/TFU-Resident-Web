import { endpointUrl, getData, postData, putData } from "./api";
import Cookies from "js-cookie";

export const getBuilding = async (residentId, buildingId, query = '') => {
   return await getData(`/apartment/resident/${residentId}?ownerName=${query}`, endpointUrl.BUILDING_URL, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': buildingId,
   },);
}

export const getMemberInApartment = async (apartmentId, query = '') => {
   return await getData(`/apartment/resident/details/${apartmentId}?memberName=${query}`, endpointUrl.BUILDING_URL, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json'
   });
}
export const addMemberInApartment = async (body) => {
   return await postData('/apartment/add-apartment-member', body, undefined, endpointUrl.BUILDING_URL);
}

export const saveBuilding = async (body, residentId) => {
   return await postData(`/apartment/resident/${residentId}`, body, undefined, endpointUrl.BUILDING_URL)
}
export const updateOwnerShip = async (body) => {
   return await putData(`/ceo/UpdateOwnerShip`, body, endpointUrl.BUILDING_URL, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get('buildingID'),
   })
}

export const deleteResident = async (data) => {
   return await postData(`/ceo/deleteResident`, data, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get('buildingID'),
   }, endpointUrl.BUILDING_URL);
}
export const addResident = async (data) => {
   return await postData(`/ceo/addResident`, data, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get('buildingID'),
   }, endpointUrl.BUILDING_URL);
}

export const addNewResident = async (data) => {
   return await postData(`/resident/addResident`, data, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get('buildingID'),
   }, endpointUrl.BUILDING_URL);
}

export const getResident = async () => {
   return await postData('/resident/GetResidents', {}, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get('buildingID'),
   }, endpointUrl.BUILDING_URL);
}

export const updateMemberResident = async (data) => {
   return await postData(`/resident/updateResident`, data, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get('buildingID'),
   }, endpointUrl.BUILDING_URL);
}

export const deleteMemberResident = async (residentId) => {
   return await postData(`/resident/deleteResident`, { residentId }, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get('buildingID'),
   }, endpointUrl.BUILDING_URL);
}

export const updateResident = async (data) => {
   return await putData(`/ceo/updateResident`, data, endpointUrl.BUILDING_URL);
}