import {useState} from "react";
import {useProvider} from "./tokenValidator";


export const useLogin = (endpoint) => {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({
        hasError: false,
        errorMessage: '',
    });

    const [isToken, setToken] = useState("");
    const setUserToken = useProvider();

    const handleSubmit = (values) => {

        fetch(endpoint, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        })
            .then(res => {
                const statusCode = res.status.toString();
                const result = res.json();

                if (statusCode.match(/^[23]\d{2}$/)) {
                    setSubmitted(true);
                    result.then(data => {
                        if (data.token) {
                            setUserToken.decodeToken(data.token);
                            setToken(data.token);
                        }
                    })

                } else {
                    result.then(data => {
                        if (data.error === "Unauthorized") {
                            data.errorMessage = "You are not authorized, please register";
                        }
                        setError({
                            hasError: true,
                            errorMessage: data.errorMessage || "Something went wrong. Try again!",
                        });
                    })
                    setTimeout(() => {
                        setError({
                            hasError: false,
                            errorMessage: "",
                        });
                    }, 6000);
                }
            })
            .catch((error) => {
                setError({
                    hasError: true,
                    errorMessage: "Something went wrong. Try again!",
                })
                setTimeout(() => {
                    setError({
                        hasError: false,
                        errorMessage: "",
                    });
                }, 6000);
            })
    }

    return {
        handleSubmit,
        submitted,
        error,
        isToken
    };
}
