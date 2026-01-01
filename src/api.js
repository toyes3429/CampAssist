import axios from "axios";
const API = "http://127.0.0.1:5000/api";

export const getUsers = () => axios.get(`${API}/users`);
export const signupUser = (user) => axios.post(`${API}/users`, user);
export const loginUser = (email, password) =>
  axios.post(`${API}/login`, { email, password });
export const registerUser = (name, email, password) =>
  axios.post(`${API}/register`, { name, email, password });
export const getRequests = () => axios.get(`${API}/requests/${localStorage.getItem("userEmail")}`);
export const createRequest = (payload) => axios.post(`${API}/requests`, payload);
export const acceptRequest = (id, runnerEmail) =>
  axios.patch(`${API}/requests/${id}/accept`, { runner_email: runnerEmail });
export const ignoreRequest = (id) => axios.patch(`${API}/requests/${id}/ignore`);
export const completeRequest = (id) => axios.patch(`${API}/requests/${id}/complete`);
