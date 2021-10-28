import React, {useState} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, validLength, validPrice} from "../../util/Validations";
import Select from "react-validation/build/select";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import {Container, Paper} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useStyles} from "../../styling/js-styling/AuthStyles";

const AddAccommodationForm = ({form, submitForm, setTitle, title, address, setAddress, location, setLocation, type, setType, price, setPrice, addFacility, removeFacility, currentFacilities, remainingFacilities,
                              checkBtn, setFirstImage, setSecondImage, setThirdImage}) => {
    const classes = useStyles();
    const history = useHistory();
    const [showPlus, setShowPlus] = useState(false);
    const [showMinus, setShowMinus] = useState(false);

    return (
        <div className="container">
            <Paper elevation={3} className={classes.addPaper}>
                <Container className={classes.addContainer}>
                    <br/>
                    <div className="booking-avatar-container">
                        <h4>List a new property</h4>
                    </div>
                    <br/>
                    <Form onSubmit={submitForm} ref={form} className={classes.addForm}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label" id="bold-font">
                                Title
                            </label>
                            <Input
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                validations = {[required, validLength]}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label" id="bold-font">
                                Address
                            </label>
                            <Input
                                type="text"
                                className="form-control"
                                name="address"
                                onChange={e => setAddress(e.target.value)}
                                value={address}
                                validations = {[required, validLength]}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label" id="bold-font">
                                Location
                            </label>
                            <Select
                                name="location"
                                className="form-select form-select-sm mb-3"
                                aria-label=".form-select-sm example"
                                onChange={e => setLocation(e.target.value)}
                                value={location}
                                validations = {[required]}
                            >
                                <option value="" selected disabled hidden>Choose location</option>
                                <option value="London">London</option>
                                <option value="Boston">Boston</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Toronto">Toronto</option>
                                <option value="Paris">Paris</option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label" id="bold-font">
                                Accommodation type
                            </label>
                            <Select
                                name="type"
                                className="form-select form-select-sm mb-3"
                                aria-label=".form-select-sm example"
                                onChange={e => setType(e.target.value)}
                                value={type}
                                validations = {[required]}
                            >
                                <option value="" selected disabled hidden>Choose type</option>
                                <option value="Shared">Shared</option>
                                <option value="Private">Private</option>
                                <option value="Hotel">Hotel</option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label" id="bold-font">
                                Price per night
                            </label>
                            <Input
                                type="price"
                                className="form-control"
                                name="email"
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                                validations = {[required, validPrice]}
                            />
                        </div>
                        <div className="mb-3">
                            {
                                currentFacilities.length > 0 && (
                                    <div>
                                        <label className="form-label" id="bold-font">Facilities for this accommodation</label>
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
                                        <label className="form-label" id="bold-font">Add facilities</label>
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
                        <div className="mb-3">
                            <label htmlFor="firstImage" className="form-label" id="bold-font">
                                First image
                            </label>
                            <Input
                                type="file"
                                className="form-control"
                                name="firstImage"
                                onChange={(e) => setFirstImage(e.target.files[0])}
                                validations={[required]}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="secondImage" className="form-label" id="bold-font">
                                Second Image
                            </label>
                            <Input
                                type="file"
                                className="form-control"
                                name="secondImage"
                                onChange={(e) => setSecondImage(e.target.files[0])}
                                validations={[required]}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="thirdImage" className="form-label" id="bold-font">
                                Third image
                            </label>
                            <Input
                                type="file"
                                className="form-control"
                                name="thirdImage"
                                onChange={(e) => setThirdImage(e.target.files[0])}
                                validations={[required]}
                            />
                        </div>
                        <br/>
                        <div>
                            <Button type="submit" variant="contained" color="primary" className={classes.updateBtn}>
                                Submit
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.backBtn} onClick={() => history.push("/")}>
                               Back
                            </Button>
                        </div>
                        <CheckButton className={classes.checkBtn} ref={checkBtn} />
                    </Form>
                </Container>
            </Paper>
        </div>
    );
};

export default AddAccommodationForm;