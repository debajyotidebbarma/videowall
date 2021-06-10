import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.assign("/my-videos");
      });
    }
  } catch (err) {
    showAlert("error", "Incorrect email or password");
    console.log(err.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "/logout",
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const signUp = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/signup",
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", "signed up successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
