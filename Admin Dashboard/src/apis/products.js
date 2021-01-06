import AxiosService from "../commons/AxiosService"

const url = 'products';

export const getProductList = () => {
    return AxiosService.get(`http://localhost:8084/${url}`, null);
}

export const getBrandList = () => {
    return AxiosService.get(`http://localhost:8084/${url}/brands`, null);
}

export const getCategoryList = () => {
    return AxiosService.get(`http://localhost:8084/${url}/types`, null);
}

export const AddPhone = (phoneData, jwt) => {
    return AxiosService.post(`http://localhost:8084/${url}/phones`, phoneData, jwt);
}

export const AddLaptop = (phoneData, jwt) => {
    return AxiosService.post(`http://localhost:8084/${url}/laptops`, phoneData, jwt);
}

export const AddBrand = (name, jwt) => {
    return AxiosService.post(`http://localhost:8084/${url}/brand`, name, jwt);
}

export const DeleteBrand = (brandID, jwt) => {
    return AxiosService.delete(`http://localhost:8084/${url}/brand/${brandID}`, jwt);
}

export const AddCategory = (type, jwt) => {
    return AxiosService.post(`http://localhost:8084/${url}/types`, type, jwt);
}

export const DeleteCategory = (typeID, jwt) => {
    return AxiosService.delete(`http://localhost:8084/${url}/types/${typeID}`, jwt);
}

export const CreateCode = (code, jwt) => {
    return AxiosService.post(`http://localhost:8084/${url}/code`, code, jwt);
}

export const GetAllCode = () => {
    return AxiosService.get(`http://localhost:8084/${url}/code`, null);
}

export const AddPromotion = (promotionDTO, jwt) => {
    return AxiosService.post(`http://localhost:8084/${url}/promotion`, promotionDTO, jwt);
}

export const DeletePromotion = (promotionID, jwt) => {
    return AxiosService.delete(`http://localhost:8084/${url}/promotion/${promotionID}`, jwt);
}

export const GetAllPromotion = () => {
    return AxiosService.get(`http://localhost:8084/${url}/promotion`, null);
}

export const GetProductPromotion = () => {
    return AxiosService.get(`http://localhost:8084/${url}/product-promotion`, null);
}

export const GetUsedCodeOfOrder = (orderID) => {
    return AxiosService.get(`http://localhost:8084/${url}/used-code/${orderID}`, null);
}

export const UpdateProduct = (productID, productDTO) => {
    return AxiosService.put(`http://localhost:8084/${url}/${productID}`, productDTO, null);
}

export const DeleteProduct = (productID) => {
    return AxiosService.delete(`http://localhost:8084/${url}/${productID}`, null);
}