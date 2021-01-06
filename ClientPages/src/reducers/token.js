import * as types from '../constants/token';
import Cookies from 'universal-cookie';

var initialState = {
    jwt: '',
    username: '',
    email : ''
};

const reducer = (state = initialState, action) => {

    const cookies = new Cookies();

    switch (action.type) {

        case types.GET_TOKEN:
            
            var token = cookies.get('token');

            if(token !== undefined){
                state = {
                    jwt: token.jwt,
                    username : token.username,
                    email : token.email
                }
            }
            else {
                state = {
                    jwt : '',
                    username : '',
                    email : ''
                }
            }

            return { ...state }

        case types.SET_TOKEN:

            var { username, token, email } = action.payload;

            state = {
                jwt: token.jwt,
                username,
                email
            }
            
            cookies.set('token', state, {
                path: '/',
                maxAge: 3600
            })
            return { ...state }
        default: return state;
    }
}

export default reducer;