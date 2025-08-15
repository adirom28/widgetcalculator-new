import {shipReducer} from "./shipReducer/shipReducer";
import {combineReducers} from "redux";
import {userLogoReducer} from "./userLogoReducer/userLogoReducer";
import {tokenReducer} from "./tokenReducer/tokenReducer";
import {userInfoReducer} from "./userInfoReducer/userInfoReduser";


export const rootReducer = combineReducers({
    shipReducer: shipReducer,
    userLogoReducer: userLogoReducer,
    userInfoReducer: userInfoReducer,
    tokenReducer: tokenReducer,
});
