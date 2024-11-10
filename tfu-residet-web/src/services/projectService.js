import {postData} from "./api";

export const deleteManager = async (id) => {
    return await postData('/project/delete', {
        id,
    }).json()
}
export const updateManager = async (projectData) => {
    return await postData('/project/update', projectData).json()
}
export const createManager = async (projectData) => {
    return await postData('/project/create', projectData).json()
}
