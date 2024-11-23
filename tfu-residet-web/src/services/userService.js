    import {deleteData, postData} from "./api";

export const viewUserManager = async (name) => {
    return await postData('/user/viewManager', {
        name,
    }).json()
}
export const createUser = async (payload) => {
    return await postData('/user/create', {
        payload,
    }).json()
}
export const updateUser = async (payload) => {
    return await postData('/user/update', {
        payload,
    }).json()
}

export const deleteUser = async (id) => {
    return await deleteData('/user/delete', {id}).json()
}