import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import {Container, Divider, Paper} from "@material-ui/core";
import AccommodationService from "../../service/AccommodationService";
import {useForm} from "react-hook-form";
import Button from "@material-ui/core/Button";
import {useHistory, useLocation} from "react-router-dom";

const UpdateAccommodation = (props) => {
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
                <Paper elevation={3} style={{width: "75%", margin: "auto", height: "900px"}}>
                    <Container
                        style={{height: "100%", margin: "auto", textAlign: "center"}}
                    >
                        <br/>
                        <h4>Update {accommodation.title} details</h4>
                        <br/>
                        <br/>
                        <form
                            style={{width: "50%", margin: "auto"}}
                            onSubmit={handleSubmit((data) => {
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
                                    {...register("pricePerNight", {required: true, pattern: /^[0-9]*$/, max: 5000})}
                                />
                            </div>
                            {errors.pricePerNight && <span style={{color:"red"}}>Price needs to contain only digits.</span>}
                            {/*<div className="mb-3">*/}
                            {/*    <label htmlFor="firstImage" className="form-label">*/}
                            {/*        First image*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="file"*/}
                            {/*        className="form-control"*/}
                            {/*        name="firstImage"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="mb-3">*/}
                            {/*    <label htmlFor="secondImage" className="form-label">*/}
                            {/*        Second Image*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="file"*/}
                            {/*        className="form-control"*/}
                            {/*        name="secondImage"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="mb-3">*/}
                            {/*    <label htmlFor="thirdImage" className="form-label">*/}
                            {/*        Third image*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="file"*/}
                            {/*        className="form-control"*/}
                            {/*        name="thirdImage"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <br/>
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
                                <Button type="submit" variant="contained" color="primary" style={{float: "left"}}>
                                    Update
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