import {useState} from "react";
import Axios from "axios";


export const useDispatchForm = (endpoint) => {
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
        values.isCarEnclosed = Boolean(values.isCarEnclosed);

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
                        successMessage: "You have successfully changed the order status"
                    });
                } else {
                    const result = res.json();
                    console.log(result)
                }
            }
        ).catch((error) => {
            console.log(error)
            setError({
                hasError: true,
                errorMessage: "Something went wrong. Try again!",
            });
            setTimeout(() => {
                setError({
                    hasError: false,
                    errorMessage: "",
                });
            }, 6000);
        });
    }
    return {
        handleSubmit,
        error,
        success,
    };
}
