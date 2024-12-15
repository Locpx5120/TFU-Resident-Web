import {endpointUrl, postData} from "./api";
import Cookies from "js-cookie";

export const getQRCode = async (body) => {
    return await postData(`/payment/getQR`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),
    }, endpointUrl.BUILDING_URL)
}
export const verifyPayment = async (body) => {
    return await postData(`/payment/checkPayment`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),
    }, endpointUrl.BUILDING_URL)
}
export const getTransaction = async (body) => {
    return await postData(`/payment/getTransactions`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),
    }, endpointUrl.BUILDING_URL)
}
