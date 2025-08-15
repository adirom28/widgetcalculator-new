import * as type from "./type";

export const setNewShipData = (data) => (dispatch) => {
    return dispatch({type: type.SET_NEW_DATA, payload: data});
}

export const setUserLogo = (data) => (dispatch) => {
    return dispatch({type: type.SET_USER_LOGO, payload: data});
}

export const setUserInfo = (data) => (dispatch) => {
    return dispatch({type: type.SET_USER_INFO, payload: data});
}


export const setToken = (data) => (dispatch) => {
    return dispatch({type: type.SET_TOKEN, payload: data});
}
