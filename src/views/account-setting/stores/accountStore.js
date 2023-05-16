import { defineStore } from "pinia";
// import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
// import { Partner, User, Common, Maintainer } from "@/plugins/api";
import { User, Common } from "@/plugins/api";
// import router from "@/router";

export const accountStore = defineStore("partner", {
  state: () => ({
    user: {},
    userMetadata: {},
    account: {},
    isEditingBrandInfo: false,
    isEditingRepresentativeInfo: false,
    changePasswordDialog: false,
    inputAvatar: null,
    brandInfoForm: false,

    searchKey: "",
    createPartnerDialog: false,
  }),
  getters: {
    // filteredPartners() {
    //   if (!this.partners || this.partners.length == 0) return [];
    //   if (!this.searchKey) return this.partners;
    //   return this.partners.filter(
    //     (partner) =>
    //       partner.brandName
    //         .toLowerCase()
    //         .includes(this.searchKey.trim().toLowerCase()) ||
    //       partner.email
    //         .toLowerCase()
    //         .includes(this.searchKey.trim().toLowerCase())
    //   );
    // },
    // slicedPartners() {
    //   if (!this.partners || this.partners.length == 0) return [];
    //   return this.filteredPartners.slice(
    //     (this.partnerPage - 1) * this.partnersPerPage,
    //     this.partnerPage * this.partnersPerPage
    //   );
    // },
    // totalPartnerPage() {
    //   if (!this.partners || this.partners.length == 0) return 1;
    //   if (this.filteredPartners.length % this.partnersPerPage == 0)
    //     return this.filteredPartners.length / this.partnersPerPage;
    //   else
    //     return (
    //       Math.floor(this.filteredPartners.length / this.partnersPerPage) + 1
    //     );
    // },
  },
  actions: {
    reset() {
      this.partners = [];
      this.partner = {};
      this.user = {};
      this.userMetadata = {};
    },
    changePartnerAvatar(image) {
      if (!image) return;
      this.inputAvatar = image;
    },

    // async fetchPartnerInfo() {
    //   try {
    //     loading.show();
    //     const res = await Partner.fetchPartnerInfo();
    //     if (!res) {
    //       alert.error("Error occurred!", "Please try again later!");
    //       return;
    //     }
    //     this.user = get(res, "data", {});
    //     this.userMetadata = get(this.user, "userMetadata", {}) || {};
    //     this.partner = get(this.user, "partner", {});
    //   } catch (error) {
    //     alert.error("Error occurred!", error);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    // async fetchPartner(partnerId) {
    //   try {
    //     loading.show();
    //     if (!partnerId) return;
    //     const res = await Partner.fetchOne(partnerId, {
    //       params: {
    //         populate: ["users"],
    //       },
    //     });
    //     if (!res) {
    //       alert.error("Error occurred!", "Please try again later!");
    //       return;
    //     }
    //     this.partner = get(res, "data.data", {});
    //     this.partner = {
    //       id: this.partner.id,
    //       ...this.partner.attributes,
    //     };
    //     if (this.partner.users && this.partner.users.data && this.partner.users.data.length > 0)
    //       this.user = this.partner.users.data[0];
    //     this.user = {
    //       id: this.user.id,
    //       ...this.user.attributes,
    //     };
    //     this.userMetadata = this.user.userMetadata || {};
    //   } catch (error) {
    //     alert.error("Error occurred!", error);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    // async fetchPartners() {
    //   try {
    //     loading.show();
    //     const res = await Maintainer.fetchPartners();
    //     if (!res) {
    //       alert.error("Error occurred!", "Please try again later!");
    //       return;
    //     }
    //     this.partners = get(res, "data", []);
    //   } catch (error) {
    //     alert.error("Error occurred!", error);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    // async updateBrandInfo() {
    //   try {
    //     loading.show();
    //     if (!this.partner) return;
    //     let uploadedAvatarUrl = this.partner.avatarUrl;
    //     if (this.inputAvatar) {
    //       const res = await this.uploadFile();
    //       if (!res) {
    //         alert.error("Error occurred when uploading icon!", "Please try again later!");
    //         return;
    //       }
    //       uploadedAvatarUrl = res;
    //     }
    //     const res = await Partner.update(this.partner.id, {
    //       data: {
    //         ...this.partner,
    //         brandEmail: this.partner.email,
    //         avatarUrl: uploadedAvatarUrl,
    //       },
    //     });
    //     if (!res) {
    //       alert.error("Error occurred!", "Please try again later!");
    //       return;
    //     }
    //     const partner = get(res, "data.data", {});
    //     this.partner = { id: partner.id, ...partner.attributes };
    //     this.user.partner = this.partner;
    //     this.isEditingBrandInfo = false;
    //     alert.success("Update information successfully!", "");
    //   } catch (error) {
    //     alert.error("Error occurred!", error);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    // async updateRepresentativeInfo() {
    //   try {
    //     loading.show();
    //     if (!this.user || !this.userMetadata) return;
    //     const res = await User.update(this.user.id, {
    //       userMetadata: this.userMetadata,
    //     });
    //     if (!res) {
    //       alert.error("Error occurred!", "Please try again later!");
    //       return;
    //     }
    //     const updatedUserMetadata = get(res, "data.userMetadata", {});
    //     this.userMetadata = updatedUserMetadata;
    //     this.user.userMetadata = this.userMetadata;
    //     this.isEditingRepresentativeInfo = false;
    //     alert.success("Update information successfully!", "");
    //   } catch (error) {
    //     alert.error("Error occurred!", error);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    async uploadFile() {
      try {
        loading.show();
        if (!this.inputAvatar) {
          throw new Error("Please select partner avatar!");
        }
        const formData = new FormData();
        formData.append("files", this.inputAvatar);
        const res = await Common.uploadFile(formData);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const uploadedUrls = res.data.map((data) => data.url);
        if (!uploadedUrls || uploadedUrls.length == 0) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Upload Image successfully!");
        return uploadedUrls[0];
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async changePassword(currentPassword, newPassword, confirmPassword) {
      try {
        loading.show();
        await User.changePassword(
          currentPassword,
          newPassword,
          confirmPassword
        );
        alert.success("Change password successfully!");
        this.changePasswordDialog = false;
      } catch (error) {
        console.log("error", error);
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
