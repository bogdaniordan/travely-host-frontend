import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import {Container, Paper} from "@material-ui/core";
import AccommodationService from "../../service/AccommodationService";
import {useForm} from "react-hook-form";
import Button from "@material-ui/core/Button";
import {useHistory, useLocation} from "react-router-dom";
import {useStyles} from "../../styling/js-styling/AuthStyles";

const UpdateAccommodation = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const id = props.match.params.id;
    const [accommodation, setAccommodation] = useState({});
    const [remainingFacilities, setRemainingFacilities] = useState([]);
    const [currentFacilities, setCurrentFacilities] = useState(location.state.accommodationFacilities);
    const [showPlus, setShowPlus] = useState(false);
    const [showMinus, setShowMinus] = useState(false);

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    });

    const facilityIsIncluded = facility => {
        return !currentFacilities.includes(facility);
    }

    useEffect(() => {
        AccommodationService.getById(id).then(res => {
            setAccommodation(res.data)
            reset(res.data)
        })
        AccommodationService.getAllFacilities().then(res => setRemainingFacilities(res.data.filter(facilityIsIncluded)))
    },[reset])

    const addFacility = e => {
        const chosenFacility = e.target.textContent.substr(0, e.target.textContent.indexOf(" "))
        setCurrentFacilities([...currentFacilities, chosenFacility])
        setRemainingFacilities(remainingFacilities.filter(facility => facility !== chosenFacility))
    }

    const removeFacility = e => {
        const chosenFacility = e.target.textContent.substr(0, e.target.textContent.indexOf(" "))
        setCurrentFacilities(currentFacilities.filter(facility => facility !== chosenFacility))
        setRemainingFacilities([...remainingFacilities, chosenFacility])
    }

    return (
        <div>
            <Navbar title="Update accommodation"/>
            <div className="container">
                <Paper elevation={3} className={classes.updatePaper}>
                    <Container className={classes.updateContainer}>
                        <br/>
                        <div className="booking-avatar-container">
                            <h4>Update {accommodation.title} details</h4>
                        </div>
                        <br/>
                        <br/>
                        <form className="update-user-form" onSubmit={handleSubmit((data) => {
                                AccommodationService.updateAccommodation(id, data, currentFacilities)
                                    .then(res => history.push("/"))
                            })}
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
                            {errors.title && <span className="error-red">This field needs at least 5 characters.</span>}
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
                            {errors.address && <span className="error-red">This field needs at least 7 characters.</span>}
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
                            {errors.placeType && <span className="error-red">Choose a place type.</span>}
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price per night
                                </label>
                                <input
                                    type="price"
                                    className="form-control"
                                    name="email"
                                    {...register("pricePerNight", {required: true, pattern: /^[0-9]*$/, max: 5000})}
                                />
                            </div>
                            {errors.pricePerNight && <span className="error-red">Price needs to contain only digits.</span>}
                            <br/>
                            <div className="mb-3">
                                {
                                    currentFacilities.length > 0 && (
                                        <div>
                                            <label className="form-label">Facilities for this accommodation</label>
                                            <ul className="nav">
                                                {currentFacilities.map(facility => (
                                                    <li className="active">
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            style={{margin: "2px"}}
                                                            onClick={removeFacility}
                                                            onMouseEnter={() => setShowMinus(true)}
                                                            onMouseLeave={() => setShowMinus(false)}
                                                        >
                                                            <i className="glyphicon glyphicon-home">{facility}{showMinus ? <> -</> : <> </>}</i>
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                }
                                <br/>
                                {
                                    remainingFacilities.length > 0 && (
                                        <div>
                                            <label className="form-label">Add facilities</label>
                                            <ul className="nav">
                                                {remainingFacilities.map(facility => (
                                                    <li className="active">
                                                        <Button
                                                            color="error"
                                                            variant="contained"
                                                            style={{margin: "2px", backgroundColor: "green", color: "white"}}
                                                            onClick={addFacility}
                                                            onMouseEnter={() => setShowPlus(true)}
                                                            onMouseLeave={() => setShowPlus(false)}
                                                        >
                                                            <i className="glyphicon glyphicon-home">{facility}{showPlus ? <> +</> : <> </>}</i>
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                            <br/>
                            <br/>
                            <div>
                                <Button type="submit" variant="contained" color="primary" className={classes.updateBtn}>
                                    Update
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.backBtn} onClick={() => history.push("/")}>
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