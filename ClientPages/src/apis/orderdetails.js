import AxiosService from "../commons/AxiosService"

export const getOrderDetails = (orderID, jwt) => {
    return AxiosService.get(`http://localhost:8084/orders/details/${orderID}`, jwt);
}

export const getAllOrderDetails = () => {
    return AxiosService.get(`http://localhost:8084/orders/details/products`, null);
}