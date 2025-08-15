import {useState} from "react";
import Axios from "axios";


export const useChangeStatusOrder = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const [error, setError] = useState({
        hasError: false,
        errorMessage: '',
    });

    const [success, setSuccess] = useState({
        success: false,
        successMessage: ""
    });

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    const body = {
        key: "status"
    }

    const handleSetNewStatus = (endpoint) => {
        Axios.post(
            endpoint,
            body,
            config
        ).then((res) => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    setSuccess({
                        success: true,
                        successMessage: "You have successfully changed the order status"
                    });

                } else {
                    console.log("bad")
                    setError({
                        hasError: true,
                        errorMessage: "Something went wrong. Try again!",
                    });
                }
            }
        ).catch((error) => {
            setError({
                hasError: true,
                errorMessage: "Something went wrong. Try again!",
            });
        });
    }
    return {
        handleSetNewStatus,
        error,
        success,
    };
}