import {postData} from "./api";

export const viewManager = async (name) => {
    return await postData('/project/viewManager', {
        name,
    }).json()
}

export const GetBuildings = async () => {
    return await postData('/building/GetBuildings', {
        name: "",
    }).json();
}
export const CreateBuildings = async (newBuilding) => {
    return await postData('/building/Create', newBuilding).json();

export const updateBuildings = async (newBuilding) => {
    return await postData('/building/Create', newBuilding).json();
}}

