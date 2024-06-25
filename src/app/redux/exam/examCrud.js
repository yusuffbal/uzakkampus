import axios from "axios";

const apiUrl = "https://localhost:7044/api/exams/";

export function GetUserExam(id) {
    return axios.post(`${apiUrl}GetUserExam?id=${id}`);
}

export function QuestionListByExamId(id) {
    return axios.post(`${apiUrl}QuestionListByExamId?id=${id}`);
}

export function FinishExam(exam) {
    return axios.post(`${apiUrl}FinishExam`, exam);
}

export function AddExam(exam) {
    return axios.post(`${apiUrl}AddExam`, exam);
}

export function GetAllExam() {
    return axios.post(`${apiUrl}GetAllExam`);
}

export function AddExamQuestions(question) {
    return axios.post(`${apiUrl}AddExamQuestion`, question);
}



