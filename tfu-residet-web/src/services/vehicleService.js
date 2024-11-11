import {endpointUrl, getData, postData} from "./api";
import Cookies from "js-cookie";

const header = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),}
export const getDetailVehicle = async (body) => {
    return await postData(`/apartment-services/unpaid-details/vehicle-service-details/`, body, endpointUrl.BUILDING_URL, header)
}
export const listCategory =  async () => {
    return await getData(`/servicecategory/GetAll`, endpointUrl.BUILDING_URL, header)
}
export const addVehicle = async (body) => {
    return await postData(`/service-contract/add-vehicle-service`, body, endpointUrl.BUILDING_URL, header)
}