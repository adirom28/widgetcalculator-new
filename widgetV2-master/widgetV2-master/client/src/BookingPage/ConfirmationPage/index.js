import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import "./style.css";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#ffffff",
        padding: " 10% 20%",
        width: "100%",
        height: "100vh"
    },

    imgLogo: {
        width: "100%",
        height: "100%",
    },
}));


export default function ConfirmPage() {
    const classes = useStyles();
    const info = useSelector(state => state.userInfoReducer);
    const storageData = JSON.parse(localStorage.getItem("userInfo"));
    let userInfoData = info.userInfo ? info.userInfo : storageData;


    const onRedirect = () => {
        window.location.assign(userInfoData.redirectLink);
        localStorage.removeItem("userInfo");
    }

    return (
        <Grid container className={classes.container}>
            <div className="wrapContent">
                {
                    userInfoData.logo &&
                    <div className="logo">
                        <img
                            className={classes.imgLogo}
                            src={userInfoData.logo}
                            alt="logo"
                        />
                    </div>
                }

                <Typography variant="h5"
                            className="title">{userInfoData.companyName}</Typography>
                <Typography variant="h4" className="mainTitle">Thank you for booking with us!</Typography>
                <Typography variant="body1" className="description">We will be in touch soon.</Typography>
                <Button variant="contained"
                        className="button"
                        onClick={onRedirect}>
                    Continue
                </Button>
            </div>
        </Grid>
    )
}
