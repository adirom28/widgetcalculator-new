import * as type from "../type";

export const shipReducer = (state = {}, action) => {

    switch (action.type) {
        case type.SET_NEW_DATA:
            return {...state, data: {...action.payload}}
        default:
            return state;
    }
}