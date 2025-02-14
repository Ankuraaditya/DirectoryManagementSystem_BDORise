import axios from "axios";

const API_URL = "http://localhost:5245/api"; // Update with your API URL

export const fetchBusinesses = () => axios.get(`${API_URL}/Businesses`);
export const addBusiness = (data) => axios.post(`${API_URL}/Businesses`, data);
export const deleteBusiness = (id) => axios.delete(`${API_URL}/Businesses/${id}`);
export const fetchCategories = () => axios.get(`${API_URL}/Category`);