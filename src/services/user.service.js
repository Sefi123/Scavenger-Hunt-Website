import axios from "axios";

const API_URL = "http://localhost:3000/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const createScavengerHunt = (payload) => {
  return axios.post(API_URL + "create-scavenger", payload);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  createScavengerHunt,
};

export default UserService;
