import AxiosService from "../commons/AxiosService"
import { API_ENDPOINT } from "../constants/homepage"

const url = 'products';

export const getProduct = (productID) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/${productID}`, null);
}

