import {deleteData, endpointUrl, getData, postData, putData} from "./api";
import Cookies from "js-cookie";

export const getThirdList = async (CompanyName = '', Status = '', IsTenant = true) => {
    let queryParams = [];

    if (CompanyName.trim()) {
        queryParams.push(`CompanyName=${encodeURIComponent(CompanyName)}`);
    }
    if (Status.trim()) {
        queryParams.push(`Status=${encodeURIComponent(Status)}`);
    }

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    const url = `/thirdparty/list${queryString}?IsTenant=${IsTenant}`;

    return await getData(url, endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
});
};

export const getContracts = async () => {
    return await getData(`/thirdparty/contracts`, endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
});
}
export const getContractDetail = async (thirdPartyId) => {
    return await postData(`/thirdparty/details-contract`, {thirdPartyId}, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
}, endpointUrl.BUILDING_URL);
}

export const createThirdParty = async (body) => {
    return await postData(`/thirdparty/add`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
}, endpointUrl.BUILDING_URL);
}
export const extendContract = async (body) => {
    return await postData(`/service-contract/extend-contract`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
}, endpointUrl.BUILDING_URL);
}
 
//  export const deleteThirdOne = async (id) => {
//      return await deleteData('/thirdparty', {: id}, header)
//  }
 export const addContractThird = async (body) => {
    return await postData(`/thirdparty/add-contract`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
}, endpointUrl.BUILDING_URL);
 }
 export const addHireThirdParty = async (body) => {
    return await postData(`/thirdparty/hire-thirdParty`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
}, endpointUrl.BUILDING_URL);
 }
 export const addContractHire = async (body) => {
    return await postData(`/thirdparty/add-contract-hire`, body, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
}, endpointUrl.BUILDING_URL);
 }
 export const updateStaff = async (body) => {
    return await putData(`/staff/listEmployee`,body, endpointUrl.BUILDING_URL, {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        'content-type': 'application/json',
        'buildingPermalink': Cookies.get("buildingID"),
});
 }