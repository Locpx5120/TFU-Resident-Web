import {endpointUrl, getData} from "./api";
import Cookies from "js-cookie";

export const getRole = async () => {
   return await getData(`/role/getRoles`, endpointUrl.BUILDING_URL, {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            'content-type': 'application/json',
            'buildingPermalink': Cookies.get("buildingID"),
          });
}