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
import {required, validLength, validPrice} from "../../util/Validations";
import AccommodationService from "../../service/AccommodationService";

const AddAccommodation = () => {
    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();
    const [facilities, setFacilities] = useState([]);
    const [checkedFacilities, setCheckedFacilities] = useState([]);

    useEffect(() => {
        AccommodationService.getAllFacilities().then(res => {
            setFacilities(res.data);
            setCheckedFacilities(new Array(res.data.length).fill(false));
        })
    }, [])

    const [title, setTitle] = useState();
    const [address,  setAddress] = useState();
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [firstImage, setFirstImage] = useState();
    const [secondImage, setSecondImage] = useState();
    const [thirdImage, setThirdImage] = useState();

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedFacilities.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedFacilities(updatedCheckedState);
    }

    const getFacilitiesNames = () => {
        let lst = [];
        checkedFacilities.map((facil, index) => {
            if(facil) {
                lst.push(facilities[index]);
            }
        })
        return lst;
    }

    const submitForm = e => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        console.log(getFacilitiesNames())
        if (checkBtn.current.context._errors.length === 0) {
            console.log("DAIIII")
            AccommodationService.addAccommodation(title, address, location ,price, getFacilitiesNames(), type, AuthService.getCurrentUser().id).then(
                res => {
                    setMessage("Accommodation successfully added.")
                    setSuccessful(true);
                    setTimeout(() => {
                        history.push("/");
                    }, 1700)
                },
                error => {
                    setMessage("Something went wrong!");
                    setSuccessful(false);
                }
            )
        }
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
                        onSubmit={submitForm}
                        ref={form}
                    >
                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
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