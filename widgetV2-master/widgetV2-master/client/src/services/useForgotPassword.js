import {useState} from "react";
import Axios from "axios";


export const useForgotPassword = (endpoint) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const [error, setError] = useState({
        hasError: false,
        errorMessage: '',
    });

    const [success, setSuccess] = useState({
        success: false,
        successMessage: ""
    });

    const handleSubmit = (values) => {
        console.log(token)

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        Axios.post(
            endpoint,
            values,
            config
        ).then((res) => {
                const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    setSuccess({
                        success: true,
                        successMessage: "We have sent you a confirmation email, please check your email"
                    });

                    setTimeout(() => {
                        setSuccess({success: false, successMessage: "",})
                    }, 6000);
                } else {
                    setError({
                        hasError: true,
                        errorMessage: "Something went wrong. Try again!",
                    });
                    setTimeout(() => {
                        setError({hasError: true, errorMessage: "",})
                    }, 6000);

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
        handleSubmit,
        error,
        success,
    };
}