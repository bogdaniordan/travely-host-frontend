import {isEmail} from "validator";
import React from "react";

export const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export const nameValidation = value => {
    if (value.length < 3 && value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Name must be between 3 and 15 characters long.
            </div>
        );
    }
}

export const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};


export const validUsername = (value) => {
    if (value.length < 3 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 25 characters.
            </div>
        );
    }
};

export const validPassword = (value) => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 5 and 25 characters.
            </div>
        );
    }
};

export const validLength = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Input length must not be lowed than 3 or higher than 20.
            </div>

        )
    }
}