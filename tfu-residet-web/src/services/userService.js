    import {deleteData, postData, getData2, postData2} from "./api";

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

export const updateUserLogin = async (payload) => {
    return await postData2('/auth/updateUserLogin', payload) 
}

export const updateUserPass = async (payload) => {
    return await postData2('/auth/updateUserPass', payload) 
}

export const getUserLogin = async () => {
    return await getData2('/auth/token');
}


export const deleteUser = async (id) => {
    return await deleteData('/user/delete', {id}).json()
}