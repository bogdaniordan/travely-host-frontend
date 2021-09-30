import React, {useState, useEffect, useRef} from 'react';
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService";
import AddAccommodationForm from "./AddAccommodationForm";
import Footer from "../navigation/Footer";

const AddAccommodation = () => {
    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();
    // const [facilities, setFacilities] = useState([]);
    // const [checkedFacilities, setCheckedFacilities] = useState([]);
    const [remainingFacilities, setRemainingFacilities] = useState([]);
    const [currentFacilities, setCurrentFacilities] = useState([]);

    useEffect(() => {
        AccommodationService.getAllFacilities().then(res => {
            setCurrentFacilities(res.data);
            // setFacilities(res.data);
            // setCheckedFacilities(new Array(res.data.length).fill(false));
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

    // const handleCheckboxChange = (position) => {
    //     const updatedCheckedState = checkedFacilities.map((item, index) =>
    //         index === position ? !item : item
    //     );
    //     setCheckedFacilities(updatedCheckedState);
    // }
    //
    // const getFacilitiesNames = () => {
    //     let indexedFacilities = [];
    //     checkedFacilities.map((facility, index) => {
    //         if (facility) {
    //             indexedFacilities.push(facilities[index]);
    //         }
    //     })
    //     return indexedFacilities;
    // }

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

    const submitForm = e => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AccommodationService.addAccommodation(title, address, location ,price, currentFacilities, type, AuthService.getCurrentUser().id).then(
                res => {
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
            <Navbar title={"Accommodation"}/>
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
                    // facilities={facilities}
                    // checkedFacilities={checkedFacilities}
                    // handleCheckboxChange={handleCheckboxChange}
                    currentFacilities={currentFacilities}
                    remainingFacilities={remainingFacilities}
                    addFacility={addFacility}
                    removeFacility={removeFacility}
                    checkBtn={checkBtn}
                    setFirstImage={setFirstImage}
                    setSecondImage={setSecondImage}
                    setThirdImage={setThirdImage}
                />
            <Footer />
        </div>
    );
};

export default AddAccommodation;