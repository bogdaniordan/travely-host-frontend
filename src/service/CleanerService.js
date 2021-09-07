import axios from "axios";
import AuthHeader from "./AuthHeader";

const CLEANER_SERVICE_API_URL = "http://localhost:8080/cleaners";

class CleanerService {
    findAllCleaners() {
        return axios.get(`${CLEANER_SERVICE_API_URL}/all`, {headers: AuthHeader()})
    }

    hireCleaner(cleanerId, hostId) {
        return axios.get(`${CLEANER_SERVICE_API_URL}/hire-cleaner/${cleanerId}/${hostId}`, {headers: AuthHeader()});
    }

    fireCleaner(id) {
        return axios.get(`${CLEANER_SERVICE_API_URL}/fire-cleaner/${id}`, {headers: AuthHeader()})
    }

    filterByStatus(status) {
        return axios.get(`${CLEANER_SERVICE_API_URL}/filter-by-status/${status}`, {headers: AuthHeader()});
    }

    getAllForHost(id) {
        return axios.get(`${CLEANER_SERVICE_API_URL}/all-for-host/${id}`, {headers: AuthHeader()});
    }

    accommodationCanBeCleaned(accommodationId) {
        return axios.get(`${CLEANER_SERVICE_API_URL}/can-be-cleaned/${accommodationId}`, {headers: AuthHeader()})
    }

    setToCleanAccommodation(cleanerId, accommodationId) {
        return axios.get(`${CLEANER_SERVICE_API_URL}/set-clean/${cleanerId}/${accommodationId}`, {headers: AuthHeader()})
    }

    accommodationIsCleanedBy(accommodationId) {
        return axios.get(`${CLEANER_SERVICE_API_URL}/accommodation-is-cleaned-by/${accommodationId}`, {headers: AuthHeader()});
    }
}

export default new CleanerService;