import { defineStore } from "pinia";
import { Contact, Common } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
export const contactStore = defineStore("contact", {
  state: () => ({
    contactPage: 1,
    contactsPerPage: 10,
    categories: [],
    contact: {},
    contacts: [],
    contactThumbnail: null,
    contactCertification: null,
    contactAccreditation: null,
    contactForm: false,
    searchKey: "",
    drawerDetail: false,
    contactNotification: 0,
  }),
  getters: {
    slicedcontacts() {
      if (!this.contacts || this.contacts.length == 0) return [];
      return this.filteredcontacts.slice(
        (this.contactPage - 1) * this.contactsPerPage,
        this.contactPage * this.contactsPerPage
      );
    },
    filteredcontacts() {
      if (!this.contacts || this.contacts.length == 0) return [];
      let filtered = this.contacts;
      if (this.searchKey)
        filtered = filtered.filter(
          (contact) =>
            contact.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            contact.title
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase())
        );
      return filtered;
    },
    // sortedCampaigns() {
    //   if (!this.voucherData || this.voucherData.length == 0) return [];
    //   let sortedCampaigns = this.voucherData;
    //   if (!this.sortBy) return sortedCampaigns;
    //   switch (this.sortBy) {
    //     default:
    //     case "asc":
    //       sortedCampaigns.sort((a, b) => a.title.localeCompare(b.title));
    //       break;
    //     case "desc":
    //       sortedCampaigns.sort((a, b) => b.title.localeCompare(a.title));
    //       break;
    //     case "newest":
    //       sortedCampaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    //       break;
    //     case "oldest":
    //       sortedCampaigns.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    //       break;
    //     case "priceUp":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => a.price - b.price);
    //       break;
    //     case "priceDown":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => b.price - a.price);
    //       break;
    //   }
    //   return sortedCampaigns;
    // },
    totalcontactPage() {
      if (!this.contacts || this.filteredcontacts.length == 0) return 1;
      if (this.filteredcontacts.length % this.contactsPerPage == 0)
        return this.filteredcontacts.length / this.contactsPerPage;
      else
        return (
          Math.floor(this.filteredcontacts.length / this.contactsPerPage) + 1
        );
    },
    totalcontact() {
      if (!this.contacts || this.filteredcontacts.length == 0) return 1;
      return this.filteredcontacts.length;
    },
  },
  actions: {
    async fetchContacts() {
      try {
        loading.show();
        const res = await Contact.fetch({
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching contacts!",
            "Please try again later!"
          );
          return;
        }
        const contacts = get(res, "data.data", []);
        if (!contacts && contacts.length == 0) return;
        const mappedcontacts = contacts.map((contact) => {
          return {
            id: contact.id,
            ...contact.attributes,
            contactCategory: {
              id: get(contact, "attributes.contactCategory.data.id", -1),
              ...get(contact, "attributes.contactCategory.data.attributes", {}),
            },
            author: get(contact, "attributes.user.data.attributes", {}),
          };
        });
        let count = mappedcontacts.filter(
          (contact) => contact.data.status == "unChecked"
        ).length;
        if (count <= 0) {
          this.contactNotification = 0;
        } else {
          this.contactNotification = count;
        }
        this.contacts = mappedcontacts;
        console.log("contacts", this.contacts);
        console.log("contactNotification", this.contactNotification);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    // async fetchContact(code) {
    //   try {
    //     loading.show();
    //     const res = await Contact.fetch({
    //       populate: "*",
    //     });
    //     if (!res) {
    //       alert.error(
    //         "Error occurred when fetching contacts!",
    //         "Please try again later!"
    //       );
    //       return;
    //     }
    //     const contacts = get(res, "data.data", []);
    //     if (!contacts && contacts.length == 0) return;
    //     const mappedcontacts = contacts.map((contact) => {
    //       return {
    //         id: contact.id,
    //         ...contact.attributes,
    //         contactCategory: {
    //           id: get(contact, "attributes.contactCategory.data.id", -1),
    //           ...get(contact, "attributes.contactCategory.data.attributes", {}),
    //         },
    //         author: get(contact, "attributes.user.data.attributes", {}),
    //       };
    //     });
    //     this.contacts = mappedcontacts;
    //   } catch (error) {
    //     alert.error("Error occurred!", error.message);
    //   } finally {
    //     loading.hide();
    //   }
    // },
    async updateContactStatus() {
      try {
        if (!this.contact) return;
        loading.show();
        //upload images

        let query = {
          ...this.contact,
          data: {
            status: "done",
          },
        };
        const res = await Contact.update(this.contact.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.fetchContacts();
        alert.success("Cập nhật liên hệ!");
      } catch (error) {
        alert.error("Update contact fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async uploadFile(file) {
      try {
        if (!file) return;

        loading.show();
        const formData = new FormData();
        formData.append("files", file);

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
        alert.success("Upload ảnh thành công!");
        return uploadedUrls;
      } catch (error) {
        alert.error("Error occurred!", error.message);
        return;
      } finally {
        loading.hide();
      }
    },
    async deletecontact(contactId) {
      if (!contactId) return;
      try {
        loading.show();
        const res = await Contact.remove(contactId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa sản phẩm thành công!");
        await this.fetchcontacts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.contact = {};
      this.contactAccreditation = null;
      this.contactCertification = null;
      this.contactThumbnail = null;
    },
  },
});
/* eslint-enable */
