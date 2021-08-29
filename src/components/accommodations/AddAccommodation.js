import React, {useState, useEffect, useRef} from 'react';
import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import Navbar from "../main/Navbar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import {required, validLength} from "../../util/Validations";
import AccommodationService from "../../service/AccommodationService";

const AddAccommodation = () => {
    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        AccommodationService.getAllFacilities().then(res => setFacilities(res.data))
    }, [])

    const [title, setTitle] = useState();
    const [address,  setAddress] = useState();
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();

    const getProfilePicture = () => {

    }

    const submitForm = e => {

    }

    return (
        <div>
            <Navbar/>
            <div className="light">
                <Container
                    style={{
                        border: "white",
                        height: "100%",
                        width: "50%",
                        margin: "auto",
                        marginTop: "5%",
                        textAlign: "center"
                    }}
                >
                    <h1>Add accommodation</h1>
                    <Form
                        className="form-signin"
                        method="post"
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
                                validation = {[required, validLength]}
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
                                validation = {[required, validLength]}
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
                                validation={[required, validLength]}
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
                                validation={[required]}
                            >
                                <option value="" selected disabled hidden>Choose type</option>
                                <option value="shared">Shared</option>
                                <option value="private">Private</option>
                                <option value="hotel">Hotel</option>
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
                                validation={[required]}
                            />
                        </div>
                        <div className="mb-3">
                            Select the facilities this accommodation has to offer
                            <div className="topping">
                                <input type="checkbox" id="topping" name="topping" value="Paneer" />Paneer
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
                                onChange={(e) => console.log(e.target.name)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="secondImage" className="form-label">
                                First image
                            </label>
                            <Input
                                type="file"
                                className="form-control"
                                name="secondImage"
                                onChange={(e) => console.log(e.target.name)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="thirdImage" className="form-label">
                                First image
                            </label>
                            <Input
                                type="file"
                                className="form-control"
                                name="thirdImage"
                                onChange={(e) => console.log(e.target.name)}
                            />
                        </div>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default AddAccommodation;