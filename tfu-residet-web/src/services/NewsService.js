import {endpointUrl, getData, postBlobData, postData} from "./api";
import Cookies from "js-cookie";

export const NewsCreate = async (body) => {
    return await postBlobData('/notify/create', body,  {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
    })
}
export const GetNews = async (filter) => {
    return await postData('/notify/get-notifies', filter, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
    })
}
export const getDetail = async (id) => {
    return await getData(`/notify/get-notify-detail/${id}`, endpointUrl.BUILDING_URL)
}