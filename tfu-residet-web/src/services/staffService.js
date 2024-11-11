import {deleteData, endpointUrl, getData, postData, putData} from "./api";
import Cookies from "js-cookie";

const HEADER_STAFF = {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
            'buildingPermalink': Cookies.get("buildingID"),
          }
export const getStaff = async () => {
   return await getData(`/staff/listEmployee`, endpointUrl.BUILDING_URL, HEADER_STAFF);
}

export const deleteStaff = async (id) => {
    return await deleteData('/staff/listEmployee', {staffId: id}, HEADER_STAFF).json()
}
export const createStaff = async (body) => {
   return await postData(`/staff/listEmployee`,body, endpointUrl.BUILDING_URL, HEADER_STAFF);
}
export const updateStaff = async (body) => {
   return await putData(`/staff/listEmployee`,body, endpointUrl.BUILDING_URL, HEADER_STAFF);
}
