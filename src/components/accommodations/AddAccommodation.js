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
import AddAccommodationForm from "./AddAccommodationForm";

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
        checkedFacilities.map((facility, index) => {
            if (facility) {
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
        if (checkBtn.current.context._errors.length === 0) {
            AccommodationService.addAccommodation(title, address, location ,price, getFacilitiesNames(), type, AuthService.getCurrentUser().id).then(
                res => {
                    setMessage("Accommodation successfully added.")
                    setSuccessful(true);
                    uploadImages()
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

    const uploadImages = () => {
        AccommodationService.findByTitle(title).then(res => {
            AccommodationService.addImages(res.data.id, firstImage, secondImage, thirdImage)
        })
    }

    return (
        <div>
            <Navbar/>
            <div className="light">
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
                <AddAccommodationForm
                    form={form}
                    submitForm={submitForm}
                    setTitle = {setTitle}
                    title = {title}
                    address = {address}
                    setAddress={setAddress}
                    location = {location}
                    setLocation={setLocation}
                    type = {type}
                    setType={setType}
                    price={price}
                    setPrice={setPrice}
                    facilities={facilities}
                    checkedFacilities={checkedFacilities}
                    handleCheckboxChange={handleCheckboxChange}
                    checkBtn={checkBtn}
                    setFirstImage={setFirstImage}
                    setSecondImage={setSecondImage}
                    setThirdImage={setThirdImage}
                />
            </div>
        </div>
    );
};

export default AddAccommodation;