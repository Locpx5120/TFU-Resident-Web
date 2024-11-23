import {deleteData, postData} from "./api";

export const viewAdminManager = async (email) => {
    return await postData('/user/viewManager', {
        email,
    })
}
export const createAdmin = async (payload) => {
    return await postData('/user/create', payload)
}
export const updateAdmin = async (payload) => {
    return await postData('/user/update', payload)
}

export const deleteAdmin = async (id) => {
    return await deleteData('/user/delete', {id})
}