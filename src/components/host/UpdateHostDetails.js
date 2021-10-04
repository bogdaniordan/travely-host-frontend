import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import HostService from "../../service/HostService";
import AuthService from "../../service/AuthService";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import Navbar from "../navigation/Navbar";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import {Form} from "react-bootstrap";

const UpdateHostDetails = () => {
    const history = useHistory();
    const [file, setFile] = useState();
    const [host, setHost] = useState({})

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    })

    useEffect(() => {
        HostService.getById(AuthService.getCurrentUser().id).then(
            res => {
                setHost(res.data)
                console.log(AuthService.getCurrentUser().id)
                reset(res.data)
            }
        )
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
                    <Paper elevation={2} style={{height: "800px", margin: "auto", textAlign: "left", width: "80%"}}>
                        <Container style={{margin: "auto", fontWeight: "bold"}}>
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
                                    <label htmlFor="firstName">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        {...register("firstName", {required: true, minLength: 3})}
                                    />
                                </div>
                                {errors.firstName && <span style={{color:"red"}}>This field needs at least 3 characters.</span>}
                                <div className="form-group">
                                    <label htmlFor="username">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        {...register("lastName", {required: true, minLength: 3})}
                                    />
                                </div>
                                {errors.lastName && <span style={{color:"red"}}>This field needs at least 3 characters.</span>}
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        {...register("email", {required: true,  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                                    />
                                </div>
                                {errors.email && <span style={{color:"red"}}>Please enter a valid email!</span>}
                                <div className="form-group">
                                    <label htmlFor="phoneNumber" className="form-label">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        {...register("phoneNumber", {required: true, length: 6, pattern: /^[0-9]*$/})}
                                    />
                                </div>
                                {errors.phoneNumber && <span style={{color:"red"}}>Please enter a valid phone number!</span>}
                                <label htmlFor="gender" className="form-label">
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
                                {errors.gender && <span style={{color:"red"}}>Please pick a gender!</span>}
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    {...register("address", {required: true , minLength: 10, maxLength: 40})}
                                />
                                {errors.address && <span style={{color:"red"}}>Enter a valid address!</span>}
                                <label htmlFor="age" className="form-label">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    {...register("country", {required: true, minLength: 3})}
                                />
                                {errors.country && <span style={{color:"red"}}>Field needs to be at least 3 characters long.</span>}
                                <Form.Label>Profile picture</Form.Label>
                                <Form.Control type="file" onChange={getProfilePicture}/>
                                <br/>
                                <br/>
                                <Button variant="contained" type="submit" color="primary" style={{float: "left", marginLeft: "15px"}}>Submit</Button>
                                <Button variant="contained" color="secondary" style={{float: "right"}} onClick={() => history.push("/")}>Back</Button>
                            </form>
                        </Container>
                    </Paper>
                </div>
            <Footer />
        </div>
    );
};

export default UpdateHostDetails;