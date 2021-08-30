import axios from "axios";
import AuthHeader from "./AuthHeader";

const BOOKING_SERVICE_API_URL = "http://localhost:8080/bookings";

class BookingService {
    getByAccommodationId(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/by-accommodation/${id}`, {headers: AuthHeader()})
    }

}

export default new BookingService;