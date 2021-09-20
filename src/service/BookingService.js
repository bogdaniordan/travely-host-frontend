import axios from "axios";
import AuthHeader from "./AuthHeader";

const BOOKING_SERVICE_API_URL = "http://localhost:8080/bookings";

class BookingService {
    getAllByAccommodation(accommodationId) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/all-bookings/${accommodationId}`, {headers: AuthHeader()})
    }

    declineBooking(id) {
        return axios.delete(`${BOOKING_SERVICE_API_URL}/${id}`, {headers: AuthHeader()});
    }
}

export default new BookingService;