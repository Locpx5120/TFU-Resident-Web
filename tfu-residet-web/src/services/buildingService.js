import {postData} from "./api";
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
export const CreateBuildings = async (newBuilding) => {
    return await postData('/building/Create', newBuilding);
}
export const apiUpdateBuildings = async (newBuilding) => {
    return await postData('/building/update', newBuilding);
}

export const DeleteBuildings = async (newBuilding) => {
    return await postData('/building/delete', newBuilding);
}