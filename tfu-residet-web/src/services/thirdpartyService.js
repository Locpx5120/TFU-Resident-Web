import {deleteData, endpointUrl, getData, postData, putData} from "./api";
import Cookies from "js-cookie";

const header = {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
            'buildingPermalink': Cookies.get("buildingID"),
}

export const getThirdList = async (CompanyName, Status) => {
    if(!CompanyName || !Status) {
        return await getData(`/thirdparty/list?CompanyName`, endpointUrl.BUILDING_URL, header);
    }
    return await getData(`/thirdparty/list?CompanyName=${CompanyName}&Status=${Status}`, endpointUrl.BUILDING_URL, header);
}
export const getContracts = async () => {
    return await getData(`/thirdparty/contracts`, endpointUrl.BUILDING_URL, header);
}
export const getContractDetail = async (contractId) => {
    return await getData(`/thirdparty/contract-detail/${contractId}`, endpointUrl.BUILDING_URL, header);
}
 
//  export const deleteThirdOne = async (id) => {
//      return await deleteData('/thirdparty', {: id}, header)
//  }
 export const addContractThird = async (body) => {
    return await postData(`/add-contract`, body, endpointUrl.BUILDING_URL, header);
 }
 export const updateStaff = async (body) => {
    return await putData(`/staff/listEmployee`,body, endpointUrl.BUILDING_URL, header);
 }