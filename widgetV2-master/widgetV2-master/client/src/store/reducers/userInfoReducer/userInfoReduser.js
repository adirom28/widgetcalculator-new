import * as type from "../type";

export const userInfoReducer = (state = {}, action) => {

    switch (action.type) {
        case type.SET_USER_INFO:
            return {...state, userInfo: {...action.payload}}
        default:
            return state;
    }
}
