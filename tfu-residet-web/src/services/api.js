// src/services/api.js

import Cookies from "js-cookie";
export const endpointUrl = {
    RESIDENT_URL: 'https://nice-sutherland.202-92-7-204.plesk.page/api',
    BUILDING_URL: 'https://funny-banach.202-92-7-204.plesk.page/api',
}
// Hàm GET
const defaultGetHeader = {
    method: 'GET',
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get('buildingID'),
}

export const getData = async (endpoint, baseURL = endpointUrl.RESIDENT_URL, header = defaultGetHeader) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'GET',
        headers: header,
    });
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const getData2 = async (endpoint, baseURL = endpointUrl.BUILDING_URL, header = defaultGetHeader) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'GET',
        headers: header,
    });
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


// Hàm POST
const defaultHeader = {
    method: 'POST',
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
    'content-type': 'application/json',
    'buildingPermalink': Cookies.get('buildingID'),
}
export const postData = async (endpoint, data, header = defaultHeader, baseURL = endpointUrl.RESIDENT_URL) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(data),
        });

        // Nếu response không thành công, ném lỗi để vào catch
        if (!response.ok) throw new Error("Network response was not ok");

        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
    }
};
export const postData2 = async (endpoint, data, header = defaultHeader, baseURL = endpointUrl.BUILDING_URL) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(data),
        });

        // Nếu response không thành công, ném lỗi để vào catch
        if (!response.ok) throw new Error("Network response was not ok");

        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
    }
};
export const postBlobData = async (endpoint, data, header = defaultHeader, baseURL = endpointUrl.RESIDENT_URL) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: "POST",
            headers: header,
            body: data,
        });

        // Nếu response không thành công, ném lỗi để vào catch
        if (!response.ok) throw new Error("Network response was not ok");

        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
    }
};

// Tương tự cho PUT và DELETE
export const putData = async (endpoint, data, baseURL = endpointUrl.RESIDENT_URL, header = defaultHeader) => {
    console.log(endpoint, data, baseURL, header );
    
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
};

export const deleteData = async (endpoint, data, baseURL = endpointUrl.RESIDENT_URL, header = defaultHeader) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: header,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

