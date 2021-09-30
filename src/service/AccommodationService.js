import axios from "axios";
import AuthHeader from "./AuthHeader";

const ACCOMMODATION_SERVICE_API_URL = "http://localhost:8080/accommodations";

class AccommodationService {
    getAllByHostId(id) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/all-for-host/${id}`, { headers: AuthHeader() });
    }

    getAllFacilities() {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/all-facilities`, { headers: AuthHeader() });
    }

    addAccommodation(title, address, location, pricePerNight, facilities, placeType, hostId) {
        return axios.post(`${ACCOMMODATION_SERVICE_API_URL}/add/${hostId}`, {
            title: title,
            address: address,
            location: location,
            pricePerNight: pricePerNight,
            status: "Free",
            facilities: facilities,
            placeType: placeType,
            cleaningStatus: "CLEAN"
        },{headers: AuthHeader()});
    }

    addImages(accommodationId, firstFile, secondFile, thirdFile) {
        const firstFormData = new FormData();
        firstFormData.append("file", firstFile)
        const secondFormData = new FormData();
        secondFormData.append("file", secondFile)
        const thirdFormData = new FormData();
        thirdFormData.append("file", thirdFile)
        const filesAndTheirNames = [[firstFormData, "firstImage.jpg"], [secondFormData, "secondImage.jpg"], [thirdFormData, "thirdImage.jpg"]];
        filesAndTheirNames.map(file => {axios.post(`${ACCOMMODATION_SERVICE_API_URL}/image/upload/${accommodationId}/${file[1]}`, file[0], { headers: AuthHeader()});})
    }

    findByTitle(title) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/find-by-title/${title}`, {headers: AuthHeader()});
    }

    deleteAccommodation(id) {
        return axios.delete(`${ACCOMMODATION_SERVICE_API_URL}/${id}`, {headers: AuthHeader()})
    }

    getById(id) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/${id}`,{headers: AuthHeader()})
    }

    updateAccommodation(id, data, facilities) {
        const accommodation = {
            title: data.title,
            address: data.address,
            pricePerNight: data.pricePerNight,
            facilities: facilities,
            placeType: data.placeType
        }
        return axios.put(`${ACCOMMODATION_SERVICE_API_URL}/update/${id}`, accommodation, {headers: AuthHeader()});
    }

}

export default new AccommodationService;