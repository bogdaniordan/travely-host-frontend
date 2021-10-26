import axios from "axios"
import AuthHeader from "./auth-helpers/AuthHeader";

const QUESTION_SERVICE_API_URL = "http://localhost:8080/recommendations";

class RecommendationService{
    getAllForHost(id) {
        return axios.get(`${QUESTION_SERVICE_API_URL}/get-all-for-host/${id}`, {headers: AuthHeader()})
    }
}

export default new RecommendationService;
