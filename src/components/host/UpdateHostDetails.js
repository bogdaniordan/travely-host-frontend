import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import HostService from "../../service/HostService";
import AuthService from "../../service/auth-helpers/AuthService";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import Navbar from "../navigation/Navbar";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import {Form} from "react-bootstrap";
import {useStyles} from "../../styling/js-styling/UpdateProfileStyling";

const UpdateHostDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [file, setFile] = useState();

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    })

    useEffect(() => {
        HostService.getById(AuthService.getCurrentUser().id).then(res => reset(res.data))
    }, [reset])

    const getProfilePicture = event => {
        setFile(event.target.files[0]);
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", file);
        if (file) {
            HostService.setImage(formData);
        }
    }

    return (
        <div>
            <Navbar title={"Update host"} subtitle={"Please fill in any user detail you want to update."}/>
                <div className="container">
                    <Paper elevation={2} className={classes.updateDetailsPaper}>
                        <Container className={classes.updateDetailsContainer}>
                            <br/>
                            <h4 className="login-body-container">Please enter your new profile details</h4>
                            <br/>
                            <form onSubmit={handleSubmit((data) => {
                                HostService.updateHost(data).then(res => {
                                    uploadImage();
                                    history.push("/")
                                })
                            })}>
                                <div className="form-group">
                                    <label htmlFor="firstName" id="bold-font">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        {...register("firstName", {required: true, minLength: 3})}
                                    />
                                </div>
                                {errors.firstName && <p className="red-colored">This field needs at least 3 characters.</p>}
                                <div className="form-group">
                                    <label htmlFor="username" id="bold-font">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        {...register("lastName", {required: true, minLength: 3})}
                                    />
                                </div>
                                {errors.lastName && <p className="red-colored">This field needs at least 3 characters.</p>}
                                <div className="form-group">
                                    <label htmlFor="email" id="bold-font">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        {...register("email", {required: true,  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                                    />
                                </div>
                                {errors.email && <p className="red-colored">Please enter a valid email!</p>}
                                <div className="form-group">
                                    <label htmlFor="phoneNumber" className="form-label" id="bold-font">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        {...register("phoneNumber", {required: true, length: 6, pattern: /^[0-9]*$/})}
                                    />
                                </div>
                                {errors.phoneNumber && <p className="red-colored">Please enter a valid phone number!</p>}
                                <label htmlFor="gender" className="form-label" id="bold-font">
                                    Gender
                                </label>
                                <select
                                    className="form-control"
                                    name="gender"
                                    {...register("gender", {required: true })}
                                >
                                    <option value="" selected disabled hidden>Pick a gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && <p className="red-colored">Please pick a gender!</p>}
                                <label htmlFor="address" className="form-label" id="bold-font">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    {...register("address", {required: true , minLength: 10, maxLength: 40})}
                                />
                                {errors.address && <p className="red-colored">Enter a valid address!</p>}
                                <label htmlFor="age" className="form-label" id="bold-font">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    {...register("country", {required: true, minLength: 3})}
                                />
                                {errors.country && <p className="red-colored">Field needs to be at least 3 characters long.</p>}
                                <Form.Label className={classes.profilePicture}>Profile picture</Form.Label>
                                <Form.Control type="file" onChange={getProfilePicture}/>
                                <br/>
                                <br/>
                                <Button variant="contained" type="submit" color="primary" className={classes.submit}>Submit</Button>
                                <Button variant="contained" color="secondary" className={classes.back} onClick={() => history.push("/")}>Back</Button>
                            </form>
                        </Container>
                    </Paper>
                </div>
            <Footer />
        </div>
    );
};

export default UpdateHostDetails;