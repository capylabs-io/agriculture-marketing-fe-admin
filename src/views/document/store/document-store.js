import { defineStore } from "pinia";
import { Document, Common, DocumentCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const documentStore = defineStore("document", {
  state: () => ({
    documentPage: 1,
    documentsPerPage: 10,
    categories: [],
    document: {},
    documents: [],
    documentThumbnail: null,
    documentCertification: null,
    documentAccreditation: null,
    documentForm: false,
    searchKey: "",
  }),
  getters: {
    slicedDocuments() {
      if (!this.documents || this.documents.length == 0) return [];
      return this.filteredDocuments.slice(
        (this.documentPage - 1) * this.documentsPerPage,
        this.documentPage * this.documentsPerPage
      );
    },
    filteredDocuments() {
      if (!this.documents || this.documents.length == 0) return [];
      let filtered = this.documents;
      if (this.searchKey)
        filtered = filtered.filter(
          (document) =>
            document.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            document.title
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
    totaldocumentPage() {
      if (!this.documents || this.filteredDocuments.length == 0) return 1;
      if (this.filteredDocuments.length % this.documentsPerPage == 0)
        return this.filteredDocuments.length / this.documentsPerPage;
      else
        return (
          Math.floor(this.filteredDocuments.length / this.documentsPerPage) + 1
        );
    },
    totaldocument() {
      if (!this.documents || this.filteredDocuments.length == 0) return 1;
      return this.filteredDocuments.length;
    },
  },
  actions: {
    changeDocumentDuration(date) {
      if (!this.filterForm || !date || date.length < 2) return;
      this.filterForm.startDate = date[0];
      this.filterForm.endDate = date[1];
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await DocumentCategory.fetch();
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
    async fetchDocuments() {
      try {
        loading.show();
        console.log("filtes", this.filterForm);
        const res = await Document.fetch({
          sort: "updatedAt:desc",
          // ...params,
          // filters: {
          //   field: this.filterForm.field ? this.filterForm.field : {},
          //   numberOf: this.filterForm.numberOf ? this.filterForm.numberOf : {},
          //   documentCategory: {
          //     id: this.filterForm.documentCategory
          //       ? this.filterForm.documentCategory
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
            "Error occurred when fetching documents!",
            "Please try again later!"
          );
          return;
        }
        const documents = get(res, "data.data", []);
        if (!documents && documents.length == 0) return;
        const mappeddocuments = documents.map((documents) => {
          return {
            id: documents.id,
            ...documents.attributes,
            documentCategory: {
              id: get(documents, "attributes.documentCategory.data.id", -1),
              ...get(
                documents,
                "attributes.documentCategory.data.attributes",
                {}
              ),
            },
          };
        });
        this.documents = mappeddocuments;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async createdocument() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.documentThumbnail),
          await this.uploadFile(this.documentCertification),
          await this.uploadFile(this.documentAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);
        let query = {
          ...this.document,
          images: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : "",
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : "",
        };

        const res = await document.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo sản phẩm mới thành công!");
        router.push("/document");
      } catch (error) {
        alert.error("Create document fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updatedocument() {
      try {
        if (!this.document) return;
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.documentThumbnail),
          await this.uploadFile(this.documentCertification),
          await this.uploadFile(this.documentAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);
        let query = {
          ...this.document,
          images: uploadedThumbnail
            ? uploadedThumbnail[0]
            : this.document.images,
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : this.document.certificationImages,
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : this.document.accreditationImages,
        };

        const res = await document.update(this.document.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật sản phẩm mới thành công!");
        router.push("/document");
      } catch (error) {
        alert.error("Update document fail! Please try again later!");
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
    async deletedocument(documentId) {
      if (!documentId) return;
      try {
        loading.show();
        const res = await document.remove(documentId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa sản phẩm thành công!");
        await this.fetchdocuments();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.document = {};
      this.documentAccreditation = null;
      this.documentCertification = null;
      this.documentThumbnail = null;
    },
  },
});
/* eslint-enable */
