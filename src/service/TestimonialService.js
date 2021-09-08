import axios from "axios";
import AuthHeader from "./AuthHeader";

const TESTIMONIAL_SERVICE_API_URL = "http://localhost:8080/testimonials";

class TestimonialService {
    getAllForAccommodation(id) {
        return axios.get(`${TESTIMONIAL_SERVICE_API_URL}/get-all-for-accommodation/${id}`, {headers: AuthHeader()})
    }
}

export default new TestimonialService;