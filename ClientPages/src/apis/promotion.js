import AxiosService from "../commons/AxiosService"

const url = 'products';

export const GetAllPromotion = () => {
    return AxiosService.get(`http://localhost:8084/${url}/promotion`, null);
}

export const GetAllProductInPromotion = (promotionID) => {
    return AxiosService.get(`http://localhost:8084/${url}/gift-product/${promotionID}`, null);
}