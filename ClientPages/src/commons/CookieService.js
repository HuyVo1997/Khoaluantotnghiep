import Cookies from "universal-cookie";

class CookieSerivce {
    constructor() {
        const cookies = new Cookies();
        this.cookies = cookies;
    }

    get() {
        return this.cookies.get('token');
    }
}

export default new CookieSerivce();