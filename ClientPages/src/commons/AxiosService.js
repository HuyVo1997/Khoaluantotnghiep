import Axios from "axios";

class AxiosService {
    constructor() {
        const instance = Axios.create();
        instance.interceptors.response.use(this.handleSuccess, this.handleError)
        this.instance = instance;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(url, jwt) {
        if (jwt) {
            var config = {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }
            return this.instance.get(url, config);
        }
        else {
            return this.instance.get(url);
        }
    }

    post(url, body, jwt) {

        if (jwt) {
            var config = {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }
            return this.instance.post(url, body, config);
        }
        else {
            return this.instance.post(url, body);
        }
    }

    delete(url, jwt) {
        if (jwt) {
            var config = {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }
            return this.instance.delete(url, config);
        }
        return this.instance.delete(url);
    }

    put(url, body, jwt) {
        if (jwt) {
            var config = {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }
            return this.instance.put(url, body, config);
        }
        return this.instance.put(url, body);
    }
}

export default new AxiosService();