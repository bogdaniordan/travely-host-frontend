import axios from "axios"
import AuthHeader from "./AuthHeader";

const QUESTION_SERVICE_API_URL = "http://localhost:8080/questions";

class QuestionService {
    getAllForHost(customerId, hostId) {
        return axios.get(`${QUESTION_SERVICE_API_URL}/get-all-for-host/${customerId}/${hostId}`, {headers: AuthHeader()})
    }

    markAsSolved(id) {
        return axios.get(`${QUESTION_SERVICE_API_URL}/mark-as-solved/${id}`, {headers: AuthHeader()})
    }

   deleteQuestion(id) {
        return axios.delete(`${QUESTION_SERVICE_API_URL}/${id}`, {headers: AuthHeader()});
   }

   setResponse(id, question) {
        return axios.put(`${QUESTION_SERVICE_API_URL}/respond-question/${id}`, question, {headers: AuthHeader()});
   }

   markAsSeen(id) {
        return axios.get(`${QUESTION_SERVICE_API_URL}/mark-as-seen/${id}`, {headers: AuthHeader()});
   }

   getQuestion(id) {
        return axios.get(`${QUESTION_SERVICE_API_URL}/${id}`, {headers: AuthHeader()})
   }

   getAllQuestions() {
        return axios.get(`${QUESTION_SERVICE_API_URL}/all`, {headers: AuthHeader()});
   }

   isSolved(id) {
        return axios.get(`${QUESTION_SERVICE_API_URL}/is-solved/${id}`, {headers: AuthHeader()})
   }
}

export default new QuestionService;