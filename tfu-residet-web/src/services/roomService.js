//API Liên quan đến PHÒNG

import {endpointUrl, getData, postData} from "./api";
import Cookies from "js-cookie";

export const updateService = async (body) => {
    return await postData(`/service-contract/update-service`, body, endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),
    })
}
export const getUnpaidSummary = async (rowsPerPage, page) => {
   return await getData(`/apartment-services/unpaid-summary?pageSize=${rowsPerPage}&pageNumber=${page + 1}`, endpointUrl.BUILDING_URL);
}
export const getSummary = async (rowsPerPage, page) => {
   return await getData(`/apartment-services/summary?pageSize=${rowsPerPage}&pageNumber=${page + 1}`, endpointUrl.BUILDING_URL);
}