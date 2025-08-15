import * as type from "../type";

export const tokenReducer = (state = {}, action) => {

    switch (action.type) {
        case type.SET_TOKEN:
            return {...state, token: {...action.payload}}
        default:
            return state;
    }
}