import React, {useEffect, useState} from 'react';

import RegistrationForm from "./RegistrForm";

import './style.css';
import LoginForm from "./LoginForm";

export default function RegistrationPage() {
    const [isActive, setActive] = useState(false);
    const [hasSuccessMessage, setSuccessMessage] = useState("");
    const [currentText, setCurrentText] = useState("Please use this form to register\n If you are  a member, please");
    const currentTextForm = isActive ? "register" : "login";
    const currentForm = isActive ? "Register" : "Login";

    const textReset = "Please use your e-mail to reset your password.\n If you are not a member, please";
    const textLogin = "Please use your credentials to login.\n If you are not a member, please";
    const textRegister = "Please use this form to register\n If you are  a member, please";


    const changeState = (message) => {
        message && setSuccessMessage(message);
        setActive(() => !isActive);
    };

    const handleChangeDescription = (message) => {
        message && setCurrentText(textReset);
    }

    useEffect(() => {
        let isCancelled = true;
        !isActive && isCancelled ? setCurrentText(textRegister) : setCurrentText(textLogin);

        return () => {
            isCancelled = false;
        }
    }, [isActive]);

    return (
        <section className="fixed-background">
            <div className="wrap-card">
                <div className="card">
                    <div className="wrap-bg-content">
                        <div className="wrap-bg-content-descr">
                            <h2 className="auth-title">MAGIC IS IN THE<br/>DETAILS</h2>
                            <p className="detail-text">
                                {currentText} {' '}
                                <span>{currentTextForm}.</span></p>
                        </div>
                        <div className="wrap-bg-content-btn">
                            <button className="auth-btn" onClick={changeState}>{currentForm}</button>
                        </div>
                    </div>
                    <div className="wrap-form">
                        {isActive && <LoginForm message={hasSuccessMessage}
                                                handleChange={handleChangeDescription}/>}
                        {!isActive && <RegistrationForm onLogin={changeState}/>}
                    </div>
                </div>
            </div>
        </section>
    )
}
