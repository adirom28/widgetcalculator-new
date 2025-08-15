import {useState} from "react";
import Axios from "axios";
import {changeDateFormat} from "../AdminPage/AdminMainPage/OrdersLayout/Order";


export const useEditOrder = (endpoint) => {
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
        const date = changeDateFormat(values.date);
        delete values.date;
        const newValues = {...values, date: date};

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        Axios.patch(
            endpoint,
            newValues,
            config
        ).then((res) => {
            const statusCode = res.status.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    setSuccess({
                        success: true,
                        successMessage: "You have successfully edited the order"
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