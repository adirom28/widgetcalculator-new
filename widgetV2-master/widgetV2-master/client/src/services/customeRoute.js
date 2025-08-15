import React from "react";
import {Redirect, Route} from "react-router-dom";

function ProtectedRoute({component: Component, ...restOfProps}) {
    const token = localStorage.getItem("token");


    return (
        <Route
            {...restOfProps}
            render={(props) =>
                !!token ? <Component {...props} /> : <Redirect to="/authPage"/>
            }
        />
    );
}

export default ProtectedRoute;

export function RedirectRoute({component: Component, pathname, ...restOfProps}) {

    const dataLocalStorage = localStorage.getItem("shipData");
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                !!dataLocalStorage ? <Component {...props} /> : <Redirect to={{pathname}}/>
            }
        />
    );
}
