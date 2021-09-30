import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import {Container, Paper} from "@material-ui/core";
import AccommodationService from "../../service/AccommodationService";
import {useForm} from "react-hook-form";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const UpdateAccommodation = (props) => {
    const history = useHistory();
    const id = props.match.params.id;
    const [accommodation, setAccommodation] = useState({});
    const [facilities, setFacilities] = useState([])

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        AccommodationService.getById(id).then(res => {
            console.log(res.data)
            setAccommodation(res.data)
            reset(res.data)
        })
        AccommodationService.getAllFacilities().then(res => setFacilities(res.data))
    },[reset])

    return (
        <div>
            <Navbar/>
            <div className="container">
                <Paper elevation={3} style={{width: "75%", margin: "auto", height: "1200px"}}>
                    <Container
                        style={{height: "100%", margin: "auto", textAlign: "center"}}
                    >
                        <br/>
                        <h4>Update {accommodation.title} details</h4>
                        <br/>
                        <form
                            style={{width: "50%", margin: "auto"}}
                        >
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    {...register("title", {required: true, minLength: 5})}
                                />
                            </div>
                            {errors.title && <span style={{color:"red"}}>This field needs at least 5 characters.</span>}
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    {...register("address", {required: true, minLength: 7})}
                                />
                            </div>
                            {errors.address && <span style={{color:"red"}}>This field needs at least 7 characters.</span>}
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">
                                    Accommodation type
                                </label>
                                <select
                                    name="type"
                                    className="form-select form-select-sm mb-3"
                                    aria-label=".form-select-sm example"
                                    {...register("placeType", {required: true})}
                                >
                                    <option value="" selected disabled hidden>Choose type</option>
                                    <option value="Shared">Shared</option>
                                    <option value="Private">Private</option>
                                    <option value="Hotel">Hotel</option>
                                </select>
                            </div>
                            {errors.placeType && <span style={{color:"red"}}>Choose a place type.</span>}
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price per night
                                </label>
                                <input
                                    type="price"
                                    className="form-control"
                                    name="email"
                                    {...register("price", {required: true, pattern: /^[0-9]*$/, max: 5000})}
                                />
                            </div>
                            {errors.placeType && <span style={{color:"red"}}>Price needs to contain only digits.</span>}
                            <div className="mb-3">
                                <label>Facilities: </label>
                                <div className="facilities-boxes-container">
                                    {facilities.map(
                                        (facility, index) =>
                                            <div key={index}>
                                                <label style={{margin: "10px"}}>{facility.replace("_", " ")}</label>
                                                <input
                                                    type="checkbox"
                                                    // checked={checkedFacilities[index]}
                                                    name={facility}
                                                    value={facility}
                                                    // onChange={() => handleCheckboxChange(index)}
                                                />
                                            </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="firstImage" className="form-label">
                                    First image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="firstImage"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="secondImage" className="form-label">
                                    Second Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="secondImage"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="thirdImage" className="form-label">
                                    Third image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="thirdImage"
                                />
                            </div>
                            <br/>
                            <div>
                                <Button type="submit" variant="contained" color="primary" style={{float: "left"}}>
                                    Submit
                                </Button>
                                <Button variant="contained" color="secondary" style={{float: "right"}} onClick={() => history.push("/")}>
                                    Back
                                </Button>
                            </div>
                        </form>
                    </Container>
                </Paper>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateAccommodation;