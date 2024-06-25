import axios from "axios";

const apiUrl = "https://localhost:7044/api/courses/";

const userUrl = "https://localhost:7044/api/users/";


export function CourseByUserId(id) {
    return axios.post(`${apiUrl}CourseByUserId?Id=${id}`);
}

export function CourseById(id) {
    return axios.post(`${apiUrl}CourseById?Id=${id}`);
}

export function CreateCourse(course) {
    return axios.post(`${apiUrl}CreateCourse`, course);
}
export const GetNotStudentCourse = id => {
    return axios.post(`${userUrl}GetNotStudentCourse?courseId=${id}`);
};

export function GetAllCourse() {
    return axios.post(`${apiUrl}GetCourse`);
}


export function AddStudentsToCourse(id,StudentCourse) {
    return axios.post(`${apiUrl}AddStudentsToCourse?courseId=${id}`, StudentCourse);
}

export function CreateAssigment(assigment) {
    return axios.post(`${apiUrl}CreateAssigment`, assigment);
}

export function AddDocument(document) {
    return axios.post(`${apiUrl}AddDocument`, document);
}

export function AddVideo(video) {
    return axios.post(`${apiUrl}AddVideo`, video);
}

export const GetGrading = id => {
    return axios.post(`${apiUrl}GetGrades?id=${id}`);
};

export function UploadAssigment(assigment) {
    return axios.post(`${apiUrl}UploadAssigment`, assigment);
}
