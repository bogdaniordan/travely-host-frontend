import axios from "axios";

const API_URL = "http://localhost:8080/auth";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/sign-in/host", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("host", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("host");
    }

    register(firstName, lastName, username, password, email) {
        return axios.post(API_URL + "/register-host", {
            firstName,
            lastName,
            username,
            password,
            email,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("host"));
    }
}

export default new AuthService();
