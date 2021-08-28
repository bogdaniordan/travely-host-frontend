import axios from "axios";
import AuthHeader from "./AuthHeader";

const ACCOMMODATION_SERVICE_API_URL = "http://localhost:8080/accommodations";

class AccommodationService {
    getAllByHostId(id) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/all-for-host/${id}`, { headers: AuthHeader() });
    }
}

export default new AccommodationService;