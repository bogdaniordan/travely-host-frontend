import axios from "axios";
import AuthHeader from "./AuthHeader";

const HOST_SERVICE_API_URL = "http://localhost:8080/hosts";

class HostService {
    getById(id) {
        return axios.get(`${HOST_SERVICE_API_URL}/${id}`, {headers: AuthHeader()});
    }
}

export default new HostService;