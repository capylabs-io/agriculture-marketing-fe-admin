import axios from "axios";
import utils from "@/plugins/utils";

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
// axios.defaults.baseURL = "https://neobank-dev-api.capylabs.io/api/";

const USER_API = "/users/";
const POST_API = "/posts/";

const APIHelper = (api) => ({
  search: (params, option) => axios.get(api, { params: utils.filterObject(params) }, option),
  count: (params, option) => axios.get(api + "count", { params: utils.filterObject(params) }, option),
  fetch: (params, option) => axios.get(api, { params: utils.filterObject(params) }, option),
  fetchOne: (id, option) => axios.get(api + id, option),
  create: (params, options) => axios.post(api, utils.filterObject(params), options),
  update: (id, params, option) => axios.put(api + id, utils.filterObject(params), option),
  remove: (id, option) => axios.delete(api + id, option),
});
export const APIRespository = APIHelper;
export const Auth = {
  signIn: (signInData) => axios.post("auth/local", signInData),
  signUp: (signUpData) => axios.post("auth/local/register", signUpData),
};

export const User = {
  ...APIHelper(USER_API),
  // changePassword: (currentPassword, newPassword, confirmNewPassword) => {
  //   const user = userStore();
  //   if (!user.isConnected) return;
  //   return axios.post(
  //     "auth/change-password",
  //     {
  //       currentPassword: currentPassword,
  //       password: newPassword,
  //       passwordConfirmation: confirmNewPassword,
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + user.jwt,
  //       },
  //     }
  //   );
  // },
updateUserInfo: (model,id) => axios.put(`users/${id}`, model),
  updateUserEmail: (email, password) =>
    axios.post("users/edit-email", {
      newEmail: email,
      password,
    }),
  uploadFile: (file) => axios.post("upload", file),
};

export const Common = {
  uploadFile: (file) =>
    axios.post("upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
export const Post = {
  ...APIHelper(POST_API),
};
