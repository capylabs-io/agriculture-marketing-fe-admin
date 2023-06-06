import { defineStore } from "pinia";
import { FAQ, Common, FAQCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const faqStore = defineStore("faq", {
  state: () => ({
    faqPage: 1,
    faqsPerPage: 10,
    categories: [],
    faq: {},
    faqs: [],
    faqThumbnail: null,
    faqCertification: null,
    faqAccreditation: null,
    faqForm: false,
    searchKey: "",
  }),
  getters: {
    slicedfaqs() {
      if (!this.faqs || this.faqs.length == 0) return [];
      return this.filteredfaqs.slice(
        (this.faqPage - 1) * this.faqsPerPage,
        this.faqPage * this.faqsPerPage
      );
    },
    filteredfaqs() {
      if (!this.faqs || this.faqs.length == 0) return [];
      let filtered = this.faqs;
      if (this.searchKey)
        filtered = filtered.filter(
          (faq) =>
            faq.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            faq.title
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
    totalfaqPage() {
      if (!this.faqs || this.filteredfaqs.length == 0) return 1;
      if (this.filteredfaqs.length % this.faqsPerPage == 0)
        return this.filteredfaqs.length / this.faqsPerPage;
      else
        return (
          Math.floor(this.filteredfaqs.length / this.faqsPerPage) + 1
        );
    },
    totalfaq() {
      if (!this.faqs || this.filteredfaqs.length == 0) return 1;
      return this.filteredfaqs.length;
    },
  },
  actions: {
    async fetchCategories() {
      try {
        loading.show();
        const res = await FAQCategory.fetch();
        if (!res) {
          alert.error(`Error occurred fetch! Please try again later!`);
          return;
        }
        const categories = get(res, "data.data", []);

        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
          };
        });
        this.categories = mappedCategories;
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async fetchfaqs() {
      try {
        loading.show();
        console.log("filtes", this.filterForm);
        const res = await FAQ.fetch({
          sort: "updatedAt:desc",
          // ...params,
          // filters: {
          //   field: this.filterForm.field ? this.filterForm.field : {},
          //   numberOf: this.filterForm.numberOf ? this.filterForm.numberOf : {},
          //   faqCategory: {
          //     id: this.filterForm.faqCategory
          //       ? this.filterForm.faqCategory
          //       : {},
          //   },
          //   $and: [
          //     {
          //       issueDate: {
          //         $lte: this.filterForm.endDate ? this.filterForm.endDate : {},
          //       },
          //     },
          //     {
          //       issueDate: {
          //         $gte: this.filterForm.startDate
          //           ? this.filterForm.startDate
          //           : {},
          //       },
          //     },
          //   ],
          // },
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching faqs!",
            "Please try again later!"
          );
          return;
        }
        const faqs = get(res, "data.data", []);
        if (!faqs && faqs.length == 0) return;
        const mappedfaqs = faqs.map((faqs) => {
          return {
            id: faqs.id,
            ...faqs.attributes,
            faqCategory: {
              id: get(faqs, "attributes.faqCategory.data.id", -1),
              ...get(
                faqs,
                "attributes.faqCategory.data.attributes",
                {}
              ),
            },
          };
        });
        this.faqs = mappedfaqs;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async createfaq() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.faqThumbnail),
          await this.uploadFile(this.faqCertification),
          await this.uploadFile(this.faqAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);
        let query = {
          ...this.faq,
          images: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : "",
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : "",
        };

        const res = await FAQ.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo sản phẩm mới thành công!");
        router.push("/faq");
      } catch (error) {
        alert.error("Create faq fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updatefaq() {
      try {
        if (!this.faq) return;
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.faqThumbnail),
          await this.uploadFile(this.faqCertification),
          await this.uploadFile(this.faqAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);
        let query = {
          ...this.faq,
          images: uploadedThumbnail
            ? uploadedThumbnail[0]
            : this.faq.images,
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : this.faq.certificationImages,
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : this.faq.accreditationImages,
        };

        const res = await FAQ.update(this.faq.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật sản phẩm mới thành công!");
        router.push("/faq");
      } catch (error) {
        alert.error("Update faq fail! Please try again later!");
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
    async deletefaq(faqId) {
      if (!faqId) return;
      try {
        loading.show();
        const res = await FAQ.remove(faqId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa sản phẩm thành công!");
        await this.fetchfaqs();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.faq = {};
      this.faqAccreditation = null;
      this.faqCertification = null;
      this.faqThumbnail = null;
    },
  },
});
/* eslint-enable */
