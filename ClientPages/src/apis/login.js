import AxiosService from "../commons/AxiosService"

export const Login = (user) => {
    return AxiosService.post('http://localhost:8084/login', user, null);
}

export const LoginFacebook = (facebookRequest) => {
    return AxiosService.post('http://localhost:8084/signin/facebook', facebookRequest, null);
}