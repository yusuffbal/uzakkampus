import axios from "axios";

const apiUrl = "https://localhost:7044/api/forums/";

export function ForumByUserId(id) {
    return axios.post(`${apiUrl}ForumUserById?Id=${id}`);
}

export function ForumById(id) {
    return axios.post(`${apiUrl}ForumById?Id=${id}`);
}

export function CreatePost(postDetail) {
    return axios.post(`${apiUrl}CreatePost`, postDetail);
}

export function CreateForum(forumDetail) {
    return axios.post(`${apiUrl}CreateForum`, forumDetail);
}