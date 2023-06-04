import axios from "axios";
import { saveAs } from "file-saver";
import Blob from "blob";

// const API_URL = "https://nonchalant-foregoing-guarantee.glitch.me/";
// const API_URL = "http://localhost:3000/";
const API_URL = "https://scavenger-hunt-l6zb.onrender.com/";

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

const createQuiz = (payload) => {
  return axios.post(API_URL + "create-quiz", payload);
};

const getScavengerHunt = async (payload) => {
  return axios
    .post(API_URL + "get-scavenger", payload)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => ({ success: false, data: [] }));
};

const generateCardQR = async (payload) => {
  return axios({
    method: "post",
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
    url: API_URL + "get-scavenger-card-qr",
    data: payload,
  })
    .then(async (response) => {
      var blob = new Blob([response.data], {
        type: "application/pdf",
      });
      saveAs(blob, "test.pdf");
      return { success: true };
    })
    .catch((err) => ({ success: false, err: { err } }));
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  createScavengerHunt,
  getScavengerHunt,
  generateCardQR,
  createQuiz,
};

export default UserService;
