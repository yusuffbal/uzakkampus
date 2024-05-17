import axios from "axios";

const apiUrl = "https://localhost:7044/api/users";

function getToken() {
    return localStorage.getItem('accessToken');
}

axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

export function getCurrentUser(values) {
    return axios.post(`${apiUrl}/GetCurrentUser`, values);
}
