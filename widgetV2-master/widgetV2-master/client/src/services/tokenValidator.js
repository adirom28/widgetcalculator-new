import jwt from 'jwt-decode';
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";


export const useProvider = () => {
    const dispatch = useDispatch();
    const [isToken, setIsToken] = useState();

    const token = useSelector(state => state.tokenReducer);


    const decodeToken = (token) => {
        setIsToken(token);
        dispatch({
            type: 'SET_TOKEN',
            payload: {
                token: token
            }
        })
        const user = jwt(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userID", JSON.stringify(user.userId));
    }

    const removeToken = useCallback(() => {
        dispatch({
            type: 'SET_TOKEN',
            payload: {
                token: null
            }
        })
        setIsToken(null);
        localStorage.removeItem('token');
    }, [dispatch]);

    const isTokenExpired = useCallback(
        (token) => {
            if (!token) {
                return false;
            }
            try {
                const decoded = jwt(token);
                return decoded.exp <= new Date().getTime() / 1000 ? true : false;
            } catch (error) {
                removeToken();
                return false;
            }
        },
        [removeToken]
    );


    return {
        decodeToken,
        token,
        isToken,
        removeToken,
        isTokenExpired,
    }
}