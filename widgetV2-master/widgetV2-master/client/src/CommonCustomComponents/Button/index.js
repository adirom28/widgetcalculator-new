import React from "react";
import {useFormikContext} from "formik";
import {Button} from "@material-ui/core";

const ButtonWrapper = ({
    children,
    ...otherProps
    }) => {
    const { submitForm } = useFormikContext();

    const handlerSubmit = () => {
        submitForm();
    }

    const configButton = {
        variant: "contained",
        fullWidth: true,
        onClick: handlerSubmit
    }

    return(
        <Button style={{backgroundColor: "#f29112", color: '#FFFFFF', fontSize: "16px"}} {...configButton}>
            {children}
        </Button>
    )
}
export default ButtonWrapper;