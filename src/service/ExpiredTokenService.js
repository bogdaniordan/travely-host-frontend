import jwtDecode from "jwt-decode";
import AuthService from "./auth-helpers/AuthService";

export default function ExpiredTokenService() {
    let token = localStorage.getItem("host");
    if (token) {
        let decodedToken = jwtDecode(token);
        console.log("Decoded Token", decodedToken);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            AuthService.logout();
        } else {
            console.log("Valid token");
        }
    }

}
