import {useState} from "react";
import Axios from "axios";


export const useResetPassword = (endpoint) => {


    const [error, setError] = useState({
        hasError: false,
        errorMessage: '',
    });

    const [success, setSuccess] = useState({
        success: false,
        successMessage: ""
    });

    const handleSubmit = (values) => {

        const config = {
            headers: {'Content-Type': 'application/json'}
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
                            successMessage: "You have successfully changed your password!"
                        });

                    setTimeout(() => {
                        setSuccess({success: false, successMessage: "",})
                    }, 6000);

                } else {
                    console.log("bad")
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
            console.log(error)
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