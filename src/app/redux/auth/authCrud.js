import axios from "axios";

const apiUrl = "https://localhost:7044/api/auth";



export function getCurrentUser(values) {
    return axios.post(`${apiUrl}/GetCurrentUser`, values);
}

export function CreateToken(values) {
    return axios.post(`${apiUrl}/Login`, values);
}
