import ExpiredTokenService from "./ExpiredTokenService";

export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem('host'));

    ExpiredTokenService();

    if (user && user.token) {
        return { Authorization : 'Bearer ' + user.token };
    } else {
        return {};
    }
}