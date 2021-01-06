import AxiosService from "../commons/AxiosService"
import { API_ENDPOINT } from "../constants/homepage"

const url = 'orders'

export const getProductFromCart = (user, jwt) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/cart/${user}`, jwt);
}

export const AddProductToCart = (products, jwt) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/cart`, products, jwt);
}

export const DeleteProductFromCart = (cartID, jwt) => {
    return AxiosService.delete(`${API_ENDPOINT}/${url}/cart/${cartID}`, jwt);
}

export const UpdateQuantity = (cartID, body, jwt) => {
    return AxiosService.put(`${API_ENDPOINT}/${url}/quantity/${cartID}`, body, jwt);
}