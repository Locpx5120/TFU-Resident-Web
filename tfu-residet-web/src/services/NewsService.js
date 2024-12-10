import {endpointUrl, getData, postBlobData, postData} from "./api";
import Cookies from "js-cookie";

export const NewsCreate = async (body) => {
    return await postBlobData('/notify/create', body,  {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
    }, endpointUrl.BUILDING_URL)
}
export const NewsUpdate = async (body) => {
    return await postBlobData('/notify/update-notify', body,  {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
    }, endpointUrl.BUILDING_URL)
}
export const GetNews = async (filter) => {
    return await postData('/notify/get-notifies', filter, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'Content-Type': 'application/json'
    }, endpointUrl.BUILDING_URL)
}
export const getDetail = async (id) => {
    return await postData(`/notify/get-notify-detail?notifyId=${id}`,"", {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'Content-Type': 'application/json'
    }, endpointUrl.BUILDING_URL)
}
export const getDetailImg = async (id) => {
    return await postData(`/Image/getImageId?id=${id}`,"", {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'Content-Type': 'application/json'
    }, endpointUrl.BUILDING_URL)
}
export const getUserNoti = async () => {
    return await postData(`/notify/get-notifies-by-user`,"", {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'Content-Type': 'application/json'
    }, endpointUrl.BUILDING_URL)
}

export const actionNoti = async (id, isApprove, body) => {
    let endpoint = `/notify/${isApprove ? 'applying-notify' : 'reject-notify'}?id=${id}`;
    if (!isApprove) {
        endpoint = `/notify/reject-notify`;
    }
    return await postData(endpoint, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'Content-Type': 'application/json'
    }, endpointUrl.BUILDING_URL)
}

export const GetBuildingsForNews = async () => {
    return await getData('/building/get', endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
    })
}

