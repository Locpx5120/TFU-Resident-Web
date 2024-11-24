//API Liên quan đến PHÒNG

import {endpointUrl, getData, postData} from "./api";
import Cookies from "js-cookie";

export const updateService = async (body) => {
    return await postData(`/service-contract/update-service`, body, endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get('buildingID'),
    })
}
export const getUnpaidSummary = async (rowsPerPage, page) => {
   return await getData(`/apartment-services/unpaid-summary?pageSize=${rowsPerPage}&pageNumber=${page + 1}`, endpointUrl.BUILDING_URL);
}
export const getInvoiceResidents = async (rowsPerPage, page) => {
   return await getData(`/invoice/resident-payments?pageSize=${rowsPerPage}&pageNumber=${page + 1}`, endpointUrl.BUILDING_URL);
}
export const getSummary = async (rowsPerPage, page) => {
   return await getData(`/apartment-services/summary?pageSize=${rowsPerPage}&pageNumber=${page + 1}`,endpointUrl.BUILDING_URL, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink':  Cookies.get('buildingID'),
  });
}

export const processPayment = async (body) => {
    return await postData(`/invoice/process-payment`, body, undefined, endpointUrl.BUILDING_URL);
}
export const invoiceAdd = async () => {
    return await postData(`/invoice/add`, {}, undefined, endpointUrl.BUILDING_URL);
}
export const paymentSummary = async (rowsPerPage, page) => {
    return await getData(`/apartment-services/payment-summary?pageSize=${rowsPerPage}&pageNumber=${page + 1}`,endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink':  Cookies.get('buildingID'),
      });
}