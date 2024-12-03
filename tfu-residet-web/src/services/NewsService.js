import {postBlobData} from "./api";
import Cookies from "js-cookie";

export const NewsCreate = async (body) => {
    return await postBlobData('/notify/create', body,  {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
    })
}