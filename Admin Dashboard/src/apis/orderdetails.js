import AxiosService from "../commons/AxiosService"

export const getOrderDetails = (orderID) => {
    return AxiosService.get(`http://localhost:8084/orders/details/${orderID}`, null);
}

export const getAllOrderDetails = () => {
    return AxiosService.get(`http://localhost:8084/orders/details/products`, null);
}