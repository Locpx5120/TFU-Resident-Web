import {endpointUrl, getData, postData} from "./api";
import Cookies from "js-cookie";

export const listApartment =  async (buildingID) => {
    return await getData(`/apartment-services/summary?pageSize=10&pageNumber=1`, endpointUrl.BUILDING_URL, {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    'content-type': 'application/json',
                    'buildingPermalink':  buildingID,
                  })
}
export const detailApartment = async (body) => {
    return await postData(`/apartment-services/details`, body, endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),
    })
}
export const getServiceName  =  async (serviceTypes) => {
    return await getData(`/apartment-services/GetByCategory/${serviceTypes}`, endpointUrl.BUILDING_URL, {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    'content-type': 'application/json',
                    'buildingPermalink': Cookies.get("buildingID"),
                  })
}