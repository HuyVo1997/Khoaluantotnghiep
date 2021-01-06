import AxiosService from "../commons/AxiosService"
import { API_ENDPOINT } from "../constants/homepage"

const url = 'products';

export const onGetRecommendProduct = (email, jwt) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/recommend/${email}`, jwt);
}