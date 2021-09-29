import React from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, validLength, validPrice} from "../../util/Validations";
import Select from "react-validation/build/select";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import {Container, Paper} from "@material-ui/core";

const AddAccommodationForm = ({form, submitForm, setTitle, title, address, setAddress, location, setLocation, type, setType, price, setPrice, facilities, checkedFacilities, handleCheckboxChange,
                              checkBtn, setFirstImage, setSecondImage, setThirdImage}) => {
    return (
        <div className="container">
            <Paper elevation={3} style={{width: "75%", margin: "auto", height: "1200px"}}>
                <Container
                    style={{height: "100%", margin: "auto", textAlign: "center"}}
                >
                    <br/>
                    <h4>Host a new accommodation</h4>
                    <br/>
                    <Form
                        onSubmit={submitForm}
                        ref={form}
                        style={{width: "50%", margin: "auto"}}
                    >
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
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
                            <label htmlFor="address" className="form-label">
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
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="location" className="form-label">*/}
                        {/*        Location*/}
                        {/*    </label>*/}
                        {/*    <Input*/}
                        {/*        type="text"*/}
                        {/*        className="form-control"*/}
                        {/*        name="location"*/}
                        {/*        onChange={e => setLocation(e.target.value)}*/}
                        {/*        value={location}*/}
                        {/*        validations = {[required, validLength]}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
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
                                <option value="New York">New York</option>
                                <option value="Toronto">Toronto</option>
                                <option value="Paris">Paris</option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
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
                            <label htmlFor="price" className="form-label">
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
                        <div className="mb-3" style={{border: "1px solid grey"}}>
                            <label>Facilities: </label>
                            <div className="facilities-boxes-container">
                                {facilities.map(
                                    (facility, index) =>
                                        <div key={index}>
                                            <label style={{margin: "10px"}}>{facility.replace("_", " ")}</label>
                                            <input
                                                type="checkbox"
                                                checked={checkedFacilities[index]}
                                                name={facility}
                                                value={facility}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstImage" className="form-label">
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
                            <label htmlFor="secondImage" className="form-label">
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
                            <label htmlFor="thirdImage" className="form-label">
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
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </Container>
            </Paper>
        </div>
    );
};

export default AddAccommodationForm;