import AxiosService from "../commons/AxiosService"

const url = 'orders';

export const GetListOrder = () => {
    return AxiosService.get(`http://localhost:8084/${url}`, null);
}

export const UpdateOrder = (orderID, orderDTO) => {
    return AxiosService.put(`http://localhost:8084/${url}/${orderID}`, orderDTO, null);
}

export const DeleteOrder = (orderID) => {
    return AxiosService.delete(`http://localhost:8084/${url}/${orderID}`, null);
}