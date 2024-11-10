// src/services/api.js

import type {endpointUrl} from "./endpoint";
import Cookies from "js-cookie";
// Hàm GET
export const getData = async (endpoint, baseURL: endpointUrl = endpointUrl.RESIDENT_URL) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Hàm POST
const defaultHeader = {
    method: 'POST',
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
}
export const postData = async (endpoint, data, baseURL: endpointUrl = endpointUrl.RESIDENT_URL, header) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'POST',
            headers: header || defaultHeader,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

// Tương tự cho PUT và DELETE
export const putData = async (endpoint, data, baseURL: endpointUrl = endpointUrl.RESIDENT_URL) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'PUT',
            headers: {
                method: 'PUT',
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
};

export const deleteData = async (endpoint, data, baseURL: endpointUrl = endpointUrl.RESIDENT_URL) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                method: 'DELETE',
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
};
