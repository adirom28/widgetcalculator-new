import React from "react";

import "../AdminPage/AuthPage/style.css";

import {useHistory} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#ffffff",
    },
    description: {
        fontSize: "1.1rem",
        display: "flex",
        flexDirection: "column",
        wordWrap: "break-word",
    },
    error: {
        fontSize: ".76rem",
        lineHeight: ".9rem",
        color: "#909090",
        marginTop: "30px",
        marginBottom: "0",
    },
    errorCode: {
        fontSize: "5rem",
        fontWeight: "700",
    },
    button: {
        maxWidth: "180px",
        color: "#FFFFFF",
        backgroundColor: "#922c88",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,.15),0 1px 3px 1px rgba(0,0,0,.15)",
        borderRadius: "50px",
        lineHeight: "1.2",
        fontWeight: "500",
        border: "1px solid #922c88",
        letterSpacing: ".05rem",
        padding: ".6rem 0",
        marginTop: "20px",

        "&:hover": {
            backgroundColor: "#73236b",
            borderColor: "#73236b",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,.15),0 4px 6px 2px rgba(0,0,0,.15)",
        }
    },

}))


export default function ErrorPage() {
    const history = useHistory();
    const classes = useStyles();

    const handleRedirect = () => {
        history.push("/admin");
    }

    return (
        <section className="fixed-background">
            <div className="wrap-card">
                <div className="card">
                    <div className="wrap-bg-content">
                        <h2 className="auth-title">MAGIC IS IN THE<br/>DETAILS</h2>
                        <p className="detail-text">
                            Yes, it is indeed!
                        </p>
                    </div>
                    <div className='wrap-form'>
                        <Grid container className={classes.container}>
                            <div className={classes.description}>
                                Ooops... looks like an error occurred!
                                <p className={classes.error}>Error code</p>
                                <h5 className={classes.errorCode}>404</h5>
                                <button onClick={handleRedirect} className={classes.button}>GO BACK HOME</button>
                            </div>
                        </Grid>
                    </div>
                </div>
            </div>
        </section>
    )
}