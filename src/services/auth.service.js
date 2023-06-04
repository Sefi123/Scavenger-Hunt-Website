import axios from "axios";

// const API_URL = "https://nonchalant-foregoing-guarantee.glitch.me/";
// const API_URL = "http://localhost:3000/";
const API_URL = "https://scavenger-hunt-l6zb.onrender.com/";

const register = (payload) => {
  return axios.post(API_URL + "sign-up", payload);
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      inputEmail: username,
      inputPassword: password,
    })
    .then((response) => {
      console.log(response.data.data);
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
