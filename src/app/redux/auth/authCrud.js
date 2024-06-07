import axios from "axios";

const apiUrl = "https://localhost:7044/api/auth";
const userUrl = "https://localhost:7044/api/users"



export function getCurrentUser(values, accessToken) {
    return axios.post(
      `${userUrl}/GetCurrentUser`,
      values,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
}

export function CreateToken(values) {
    return axios.post(`${apiUrl}/Login`, values);
}
