import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;