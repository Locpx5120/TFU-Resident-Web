import {endpointUrl, getData, postBlobData, postData} from "./api";
import Cookies from "js-cookie";

export const fileCreate = async (body) => {
    return await postBlobData('/Image/addFile', body,  {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
    }, endpointUrl.BUILDING_URL)
}
export const getDetailFile = async (id) => {
    return await postData(`/Image/getFileId?id=${id}`,"", {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'Content-Type': 'application/json'
    }, endpointUrl.BUILDING_URL)
}
 

