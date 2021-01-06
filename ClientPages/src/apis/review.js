import AxiosService from "../commons/AxiosService"
import { API_ENDPOINT } from "../constants/homepage"

const url = 'products'

export const addReviewForProduct = (reviewDTO, jwt) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/review`, reviewDTO, jwt);
}

export const getReviewsForProduct = (productID) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/reviews/${productID}`, null);
}