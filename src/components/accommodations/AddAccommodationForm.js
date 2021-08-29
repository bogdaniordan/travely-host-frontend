import React from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, validLength, validPrice} from "../../util/Validations";
import Select from "react-validation/build/select";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import {Container} from "@material-ui/core";

const AddAccommodationForm = ({form, submitForm, setTitle, title, address, setAddress, location, setLocation, type, setType, price, setPrice, facilities, checkedFacilities, handleCheckboxChange,
                              checkBtn, setFirstImage, setSecondImage, setThirdImage}) => {
    return (
        <div>
            <Container
                style={{border: "white", height: "100%", width: "50%", margin: "auto", marginTop: "5%", textAlign: "center"}}
            >
                <h1>Add accommodation</h1>
                <Form
                    onSubmit={submitForm}
                    ref={form}
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
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                            Location
                        </label>
                        <Input
                            type="text"
                            className="form-control"
                            name="location"
                            onChange={e => setLocation(e.target.value)}
                            value={location}
                            validations = {[required, validLength]}
                        />
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
                    <div className="mb-3" >
                        <label>Facilities: </label>
                        <div style={{display: "flex", alignItems: "center"}}>
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
        </div>
    );
};

export default AddAccommodationForm;