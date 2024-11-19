import {postData} from "./api";
import Cookies from "js-cookie";

export const deleteManager = async (id) => {
    return await postData('/project/delete', {
        id,
    },{
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        "content-type": "application/json",
    })
}
export const updateManager = async (projectData) => {
    return await postData('/project/update', projectData, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        "content-type": "application/json",
    })
}
export const createManager = async (projectData) => {
    return await postData('/project/create', projectData,{
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        "content-type": "application/json",
    })
}
