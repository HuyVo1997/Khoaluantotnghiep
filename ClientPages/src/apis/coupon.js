import AxiosService from "../commons/AxiosService"

const url = 'products';

export const GetAllCode = () => {
    return AxiosService.get(`http://localhost:8084/${url}/code`, null);
}

export const GetUsedCodeByUser = (email, discountID) => {
    return AxiosService.get(`http://localhost:8084/${url}/used-code/${email}/${discountID}`, null);
}