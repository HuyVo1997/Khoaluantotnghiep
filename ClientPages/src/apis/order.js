import AxiosService from "../commons/AxiosService"

export const CreateOrder = (orderDTO, jwt) => {
    return AxiosService.post('http://localhost:8084/orders', orderDTO, jwt);
}

export const getOrderByUser = (user, jwt) => {
    return AxiosService.get(`http://localhost:8084/orders/${user}`, jwt);
}