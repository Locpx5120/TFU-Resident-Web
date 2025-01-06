import {endpointUrl, getData, postData, putData} from "./api";
import Cookies from "js-cookie";

export const getDetailVehicle = async (apartmentId) => {
    return await getData(`/service-contract/get/${apartmentId}`, endpointUrl.BUILDING_URL, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),})
}

 
export const listCategory =  async () => {
    return await getData(`/servicecategory/GetAll`, endpointUrl.BUILDING_URL, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),})
}
export const addVehicle = async (body) => {
    return await postData(`/service-contract/add-vehicle-service`, body, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),}, endpointUrl.BUILDING_URL)
}

export const getAllService = async (body) => {
    return await postData(`/service-contract/get-all-service`, body, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),}, endpointUrl.BUILDING_URL)
}

export const addRepairReport = async (body) => {
    return await postData(`/service-contract/add-repair-report`, body, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),}, endpointUrl.BUILDING_URL)
}
export const getServiceRepair = async (id) => {
    return await postData(`/service-contract/deatil-repair-report/${id}`, {}, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID')}, endpointUrl.BUILDING_URL)
}
export const updateServiceRepair = async (body) => {
    return await postData(`/service-contract/update-repair-report`, body, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID')}, endpointUrl.BUILDING_URL)
}
export const getServiceRequest = async () => {
    return await getData(`/service-request/get-service-requests`, endpointUrl.BUILDING_URL, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),})
}
export const vehicleServiceDetail = async (id) => {
    return await getData(`/service-contract/vehicle-service-details/${id}`, endpointUrl.BUILDING_URL, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),})
}
export const updateVehicle = async (body) => {
    return await postData(`/service-contract/update-service`, body,{
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID')}, endpointUrl.BUILDING_URL)
}

export const memeberServiceDetail = async (id) => {
    return await getData(`/resident/member-service-details/${id}`, endpointUrl.BUILDING_URL, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),})
}

export const getKyThuat = async (searchName='') => {
    return await postData(`/staff/listStaffAssigment?searchName=${searchName}`,{}, {
        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID')}, endpointUrl.BUILDING_URL);
}