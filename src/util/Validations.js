import {isEmail} from "validator";
import React from "react";

export const required = (value) => {
    if (!value) {
        return (
            <div>
                <small className="validation-negative">
                    This field is required!
                </small>
                <br/>
            </div>
        );
    }
};

export const nameValidation = value => {
    if (value.length < 3 && value.length > 15) {
        return (
            <div className="validation-negative">
                <small>
                    Name must be between 3 and 15 characters long.
                </small>
                <br/>
            </div>
        );
    }
}

export const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="validation-negative">
                <small>
                    Enter a valid email (e.g. ending with "@gmail.com")
                </small>
                <br/>
            </div>
        );
    }
};


export const validUsername = (value) => {
    if (value.length < 3 || value.length > 25) {
        return (
            <div className="validation-negative">
                <small>
                    The username must be between 3 and 25 characters.
                </small>
                <br/>
            </div>
        );
    }
};

export const validPassword = (value) => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div className="validation-negative">
                <small>
                    The password must be between 5 and 25 characters long.
                </small>
                <br/>
            </div>
        );
    }
};

export const validLength = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="validation-negative">
                <small>
                    Input length must not be lowed than 3 or higher than 20.
                </small>
                <br/>
            </div>
        );
    }
}

export const validPrice = value => {
    if (!(/^\d+$/.test(value)) || value < 5000) {
        return (
            <div className="validation-negative">
                <small>
                    Price input can contain only digits and must be less than $5000.
                </small>
                <br/>
            </div>
        );
    }
}