import { endpointUrl, getData, postData } from "./api";
import Cookies from "js-cookie";

export const listApartment = async (buildingID) => {
  return await getData(`/apartment-services/summary?pageSize=10&pageNumber=1`, endpointUrl.BUILDING_URL, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': buildingID,
  })
}
export const detailApartment = async (body) => {
  return await postData(`/apartment-services/details`, body, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
  }, endpointUrl.BUILDING_URL,)
}
export const getServiceName = async (serviceTypes) => {
  return await getData(`/apartment-services/GetByCategory/${serviceTypes}`, endpointUrl.BUILDING_URL, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get("buildingID"),
  })
}
export const getBuildingNew = async (name = "") => {
  return await getData(`/building/get?buildingName=${name}`, endpointUrl.BUILDING_URL, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get("buildingID"),
  })
}


export const addBuilding = async (body) => {
  return await postData(`/building/add`, body, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get('buildingID'),
  }, endpointUrl.BUILDING_URL);
}

export const updateBuilding = async (body) => {
  return await postData(`/building/edit`, body, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get('buildingID'),
  }, endpointUrl.BUILDING_URL);
}

export const addMember = async (body) => {
  return await postData(`/resident/add-members`, body, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get("buildingID"),
  }, endpointUrl.BUILDING_URL)
}
export const getServices = async () => {
  return await getData(`/apartment-services/get-services`, endpointUrl.BUILDING_URL, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get("buildingID"),
  })
}
export const getDetailServiceUnpaids = async (body) => {
  return await postData(`/apartment-services/unpaid-details`, body, {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get("buildingID"),
  }, endpointUrl.BUILDING_URL);
}

export const paymentSummary = async (rowsPerPage, page) => {
  return await getData(`/apartment-services/payment-summary?pageSize=${rowsPerPage}&pageNumber=${page + 1}`, endpointUrl.BUILDING_URL);
}

export const getTypeApartment = async () => {
  return await getData(`/ApartmentType/GetAllApartmentType`, endpointUrl.BUILDING_URL, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get("buildingID"), 
    })
}

export const CreateTypeApartment = async (body) => {
  return await postData(`/apartment/add-apartment`, body, {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
      'content-type': 'application/json',
      'buildingPermalink': Cookies.get("buildingID"),
    }, endpointUrl.BUILDING_URL);
}
