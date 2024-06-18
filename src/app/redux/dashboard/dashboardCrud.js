import axios from "axios";

const apiUrl = "https://localhost:7044/api/Dashboard/";

export function DashboardAnaliyses(id) {
    return axios.post(`${apiUrl}DashboardAnaliyses?Id=${id}`);
}

export function DashboardProgressTable(id) {
    return axios.post(`${apiUrl}DashboardProgressTable?Id=${id}`);
}
