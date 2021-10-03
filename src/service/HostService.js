import axios from "axios";
import AuthHeader from "./AuthHeader";
import AuthService from "./AuthService";

const HOST_SERVICE_API_URL = "http://localhost:8080/hosts";

class HostService {
    getById(id) {
        return axios.get(`${HOST_SERVICE_API_URL}/${id}`, {headers: AuthHeader()});
    }

    earnBadges(id) {
        return axios.get(`${HOST_SERVICE_API_URL}/earn-badges/${id}`, {headers: AuthHeader()})
    }

    getHostBadges(id) {
        return axios.get(`${HOST_SERVICE_API_URL}/host-badges/${id}`, {headers: AuthHeader()});
    }

    setImage(file) {
        return axios.post(`${HOST_SERVICE_API_URL}/image/upload/${AuthService.getCurrentUser().id}`, file, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + AuthService.getCurrentUser().token
            }
        })
    }

    updateHost(data) {
        const host = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            address: data.address,
            country: data.country
        }
        return axios.put(`${HOST_SERVICE_API_URL}/update-host/${AuthService.getCurrentUser().id}`, host, {headers: AuthHeader()})
    }
}

export default new HostService;