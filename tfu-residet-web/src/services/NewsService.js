import {endpointUrl, getData, postBlobData, postData} from "./api";
import Cookies from "js-cookie";

export const NewsCreate = async (body) => {
    return await postBlobData('/notify/create', body,  {
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