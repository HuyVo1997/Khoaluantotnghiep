import AxiosService from "../commons/AxiosService"
import { API_ENDPOINT } from "../constants/homepage"

const url = 'products';

export const getProductListByType = (brand, type) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/${brand}/${type}`, null);
}
