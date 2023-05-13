import axios from "axios";
import utils from "@/plugins/utils";
import { userStore } from "@/stores/userStore";

// axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.defaults.baseURL = "https://neobank-dev-api.capylabs.io/api/";

const USER_API = "/users/";
const CATEGORY_API = "/campaign-categories/";
const CAMPAIGN_API = "/campaigns/";
const PARTNER_API = "/partners/";

const APIHelper = (api) => ({
  search: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  count: (params, option) =>
    axios.get(api + "count", { params: utils.filterObject(params) }, option),
  fetch: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  fetchOne: (id, option) => axios.get(api + id, option),
  create: (params, options) =>
    axios.post(api, utils.filterObject(params), options),
  update: (id, params, option) =>
    axios.put(api + id, utils.filterObject(params), option),
  remove: (id, option) => axios.delete(api + id, option),
});
export const APIRespository = APIHelper;
export const Auth = {
  signIn: (signInData) => axios.post("/admin/auth", signInData),
};

export const User = {
  ...APIHelper(USER_API),
  changePassword: (currentPassword, newPassword, confirmNewPassword) => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.post(
      "auth/change-password",
      {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmNewPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + user.jwt,
        },
      }
    );
  },
  updateUserInfo: (model) => axios.put("users/edit/", model),
  updateUserEmail: (email, password) =>
    axios.post("users/edit-email", {
      newEmail: email,
      password,
    }),
};

export const Partner = {
  ...APIHelper(PARTNER_API),
  fetchPartnerInfo: () => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("users/me?populate=partner", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
  fetchPartnerCampaigns: () => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("partner/campaigns", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
  
  fetchDashBoard: () => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("partner/dashboard/metrics", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
};

export const Category = {
  ...APIHelper(CATEGORY_API),
};

export const Voucher = {
  fetchVouchers: (token) =>
    axios.get("vouchers?pagination[limit]=-1", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  purchaseVouchers: (id, token) =>
    axios.post(
      `vouchers/${id}/purchase`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  fetchUserVouchers: (userId) =>
    axios.get(
      "vouchers?populate[0]=campaign&populate[1]=campaignCategory&filters[user][id]=" +
        userId,
      {}
    ),
};

export const Common = {
  uploadFile: (file) =>
    axios.post("upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export const Maintainer = {
  fetchDashBoard: () => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("maintainer/dashboard/metrics", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
  fetchCampaigns: () => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("maintainer/campaigns", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
  fetchPartners() {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("maintainer/partners", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
  fetchUsers() {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("maintainer/users", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
  fetchPartnerList: () => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.get("maintainer/partners", {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
  createPartner: (params) => {
    const user = userStore();
    if (!user.isConnected) return;
    return axios.post("maintainer/partners", params, {
      headers: {
        Authorization: "Bearer " + user.jwt,
      },
    });
  },
};

export const Campaign = {
  ...APIHelper(CAMPAIGN_API),
  fetchCampaignDetail: (campaignId) => {
    return axios.get(`campaigns/${campaignId}?populate[0]=campaignCategory`);
  },
  fetchCampaignTransactions: (campaignId) => {
    return axios.get(
      `vouchers?populate[0]=user&filters[campaign][id]=${campaignId}`
    );
  },
};
