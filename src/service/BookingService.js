import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";

const BOOKING_SERVICE_API_URL = "http://localhost:8080/bookings";

class BookingService {
    getAllByAccommodation(accommodationId) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/all-bookings/${accommodationId}`, {headers: AuthHeader()})
    }

    declineBooking(id) {
        return axios.delete(`${BOOKING_SERVICE_API_URL}/${id}`, {headers: AuthHeader()});
    }

    accommodationIsBookedNow(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/accommodation-is-booked-now/${id}`, {headers: AuthHeader()})
    }

    accommodationHasFutureBookings(accommodationId) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/accommodation-has-future-bookings/${accommodationId}`, {headers: AuthHeader()})
    }
    
    getClosestFutureBooking(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/closest-future-booking/${id}`, {headers: AuthHeader()});
    }

    getAllByHost(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/bookings-by-host/${id}`, {headers: AuthHeader()});
    }

    markAsSeen(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/mark-as-seen/${id}`, {headers: AuthHeader()})
    }
}

export default new BookingService;