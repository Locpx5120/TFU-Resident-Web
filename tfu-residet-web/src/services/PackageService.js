import {endpointUrl, getData, postData} from "./api";
import Cookies from "js-cookie";

export const listAllPackage =  async () => {
    return await getData(`/package/get-all`, endpointUrl.BUILDING_URL, {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    'content-type': 'application/json',
                    'buildingPermalink':  Cookies.get('buildingID'),
                  })
}