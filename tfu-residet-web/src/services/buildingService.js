import {endpointUrl, getData, postData} from "./api";
import Cookies from "js-cookie";
export const viewManager = async (name) => {
    return await postData('/project/viewManager', {
        name,
    },{
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        "content-type": "application/json",
    })
}

export const GetBuildings = async () => {
    return await postData('/building/GetBuildings', {
        name: "",
    });
}
export const GetBuildingsByUser = async () => {
    return await getData('/building/buildings/getbyuser', endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
    })
}
export const getApartmentByBuilding = async (buildingID) => {
    return await getData(`/apartment/by-building?buildingId=${buildingID}`, endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
    });
}
export const CreateBuildings = async (newBuilding) => {
    return await postData('/building/Create', newBuilding);
}
export const apiUpdateBuildings = async (newBuilding) => {
    return await postData('/building/update', newBuilding);
}

export const DeleteBuildings = async (newBuilding) => {
    return await postData('/building/delete', newBuilding);
}