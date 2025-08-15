import * as type from "../type";

export const userLogoReducer = (state = {}, action) => {

    switch (action.type) {
        case type.SET_USER_LOGO:
            return {...state,
                logo: action.payload.logo}
        default:
            return state;
    }
}