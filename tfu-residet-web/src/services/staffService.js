import {deleteData, endpointUrl, getData, postData, putData} from "./api";
import Cookies from "js-cookie";

const HEADER_STAFF = {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
            'buildingPermalink': Cookies.get("buildingID"),
          }
export const getStaff = async () => {
   return await getData(`/staff/list`, endpointUrl.BUILDING_URL, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get("buildingID"),
    });
}

export const deleteStaff = async (staffId) => {
  return await postData(`/staff/deleteStaff`, {staffId}, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get("buildingID"),
  }, endpointUrl.BUILDING_URL);
}
export const createStaff = async (body) => {
   return await postData(`/staff/addStaff`, body, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get("buildingID"),
    }, endpointUrl.BUILDING_URL);
}
export const updateStaff = async (body) => {
  return await postData(`/staff/updateStaff`, body, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get("buildingID"),
  }, endpointUrl.BUILDING_URL);
}
