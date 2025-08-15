import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AdminMainPage from "./AdminMainPage";
import {useProvider} from "../services/tokenValidator";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

export const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
        backgroundColor: "#f8f8f8",
        height: "100vh",
        padding: "0"
    },
    wrapContent: {
        height: "calc(100% - 80px)",
        backgroundColor: "#f8f8f8",
        width: "100%",
    },
    wrapNavBar: {
        backgroundColor: "#ffffff",
        height: "80px",
        width: "100%",
        padding: "1rem 1rem 1rem 2rem",
        boxShadow: "0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04)",
    },
    navBar: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%"
    },
    item: {
        listStyleType: "none",
        paddingTop: "5px",
    },
    icon: {
        flexGrow: "1",
        listStyleType: "none",
        paddingTop: "5px",
    },
    button: {
        color: "#008ecc",
        backgroundColor: "#FFFFFF",
        border: "1px solid #008ecc",
        borderRadius: "50px",
        fontSize: "1rem",
        padding: "0.3rem 2.25rem",
        transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",

        "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#008ecc",
            borderColor: "#008ecc",
            boxShadow: "0 1px 2px 0 rgba(0,0,0,.15),0 1px 3px 1px rgba(0,0,0,.15)",
        },
    },
}));

let listIcon = (
    <svg width="20px" height="20px"
         fill="#3a3a3a"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 9 17"
    >
        <rect x="0.48" y="0.5" width="7" height="1"/>
        <rect x="0.48" y="7.5" width="7" height="1"/>
        <rect x="0.48" y="15.5" width="7" height="1"/>
    </svg>)

let listIconSub = (
    <svg
        width="20px" height="20px"
        fill="#3a3a3a"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 17">
        <rect x="1.56" y="0.5" width="16" height="1"/>
        <rect x="1.56" y="7.5" width="16" height="1"/>
        <rect x="1.56" y="15.5" width="16" height="1"/>
    </svg>);


export default function AdminPage() {
    const useAuth = useProvider();
    const history = useHistory();
    const classes = useStyles();
    const [isOpenSideBar, setOpenSideBar] = useState(false);

    const logoutUser = () => {
        useAuth.removeToken();
        history.push("/authPage");
    }

    const onToddle = () => {
        setOpenSideBar(!isOpenSideBar);
    }

    const header = (
        <nav className={classes.wrapNavBar}>
            <ul className={classes.navBar}>
                <li
                    className={classes.icon}
                    onClick={onToddle}>
                    <span>{listIcon}</span>
                    <span>{listIconSub}</span>
                </li>
                <li className={classes.item}>
                    <button
                        onClick={logoutUser}
                        className={classes.button}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );

    return (
        <Grid container className={classes.container}>
            {header}
            <div className={classes.wrapContent}>
                <AdminMainPage toggle={isOpenSideBar}/>
            </div>
        </Grid>
    )
}
