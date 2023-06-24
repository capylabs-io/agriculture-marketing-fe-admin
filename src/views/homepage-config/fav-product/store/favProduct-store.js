import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
// import router from "@/router";
import { Common, HomepageConfig, Product } from "@/plugins/api";

export const favProductStore = defineStore("favProduct", {
  state: () => ({
    favProductPage: 1,
    favProductsPerPage: 10,
    favProductCreateDialog: false,
    categories: [],
    favProduct: {},
    favProducts: [],
    favSearchProducts: [],
    favProductCodes: [],
    favProductThumbnail: null,
    favProductCertification: null,
    favProductAccreditation: null,
    favProductForm: false,
    searchKey: "",
  }),
  getters: {
    // slicedfavProducts() {
    //   if (!this.favProducts || this.favProducts.length == 0) return [];
    //   return this.filteredfavProducts.slice(
    //     (this.favProductPage - 1) * this.favProductsPerPage,
    //     this.favProductPage * this.favProductsPerPage
    //   );
    // },
    filteredfavProducts() {
      if (!this.favSearchProducts || this.favSearchProducts.length == 0)
        return [];
      let filtered = this.favSearchProducts;
      if (this.searchKey)
        filtered = filtered.filter(
          (favProduct) =>
            favProduct.code.toLowerCase() ===
            this.searchKey.trim().toLowerCase()
          // .equals()
        );
      return filtered;
    },

    // totalfavProductPage() {
    //   if (!this.favProducts || this.filteredfavProducts.length == 0) return 1;
    //   if (this.filteredfavProducts.length % this.favProductsPerPage == 0)
    //     return this.filteredfavProducts.length / this.favProductsPerPage;
    //   else
    //     return (
    //       Math.floor(
    //         this.filteredfavProducts.length / this.favProductsPerPage
    //       ) + 1
    //     );
    // },
    slicedfavProducts() {
      if (!this.favProducts || this.favProducts.length == 0) return [];
      return this.favProducts.slice(
        (this.favProductsPage - 1) * this.favProductsPerPage,
        this.favProductsPage * this.favProductsPerPage
      );
    },
    totalfavProductsPage() {
      if (!this.favProducts || this.favProducts.length == 0) return 1;
      if (this.favProducts.length % this.favProductsPerPage == 0)
        return this.favProducts.length / this.favProductsPerPage;
      else
        return (
          Math.floor(this.favProducts.length / this.favProductsPerPage) + 1
        );
    },

    totalfavProduct() {
      if (!this.favProducts || this.filteredfavProducts.length == 0) return 1;
      return this.filteredfavProducts.length;
    },
  },
  actions: {
    async fetchSearchCodes() {
      try {
        loading.show();
        // if (!this.searchKey) return;
        const query = {
          // filters: {
          //   status: "publish",
          //   code: this.searchKey.trim(),
          // },
          sort: "updatedAt:desc",
          populate: "*",
          // pagination: {
          //   page: 1,
          //   pageSize: 1,
          // },
        };
        const productRes = await Product.fetch(query);
        const favProducts = get(productRes, "data.data", []);
        if (!favProducts && favProducts.length == 0) return;
        const mappedfavProducts = favProducts.map((product) => {
          return {
            id: product.id,
            code: product.attributes.code,
            images: product.attributes.images,
            name: product.attributes.name,
            price: product.attributes.price,
          };
        });

        this.favSearchProducts = mappedfavProducts;
        console.log("searchProducts", this.favSearchProducts);
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchfavProducts() {
      try {
        loading.show();
        const res = await Product.fetch({
          populate: "*",
          // filters: {
          //   code: this.favProductCodes,
          // },
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching products!",
            "Please try again later!"
          );
          return;
        }
        const favProducts = get(res, "data.data", []);
        if (!favProducts && favProducts.length == 0) return;
        const mappedfavProducts = favProducts.map((favProduct) => {
          return {
            id: favProduct.id,
            ...favProduct.attributes,
            productCategory: {
              id: get(favProduct, "attributes.productCategory.data.id", -1),
              ...get(
                favProduct,
                "attributes.productCategory.data.attributes",
                {}
              ),
            },
            cooperative: {
              id: get(favProduct, "attributes.cooperative.data.id", -1),
              ...get(favProduct, "attributes.cooperative.data.attributes", {}),
            },
            artisan: {
              id: get(favProduct, "attributes.artisan.data.id", -1),
              ...get(favProduct, "attributes.artisan.data.attributes", {}),
            },
            store: {
              id: get(favProduct, "attributes.store.data.id", -1),
              ...get(favProduct, "attributes.store.data.attributes", {}),
            },
            area: {
              id: get(favProduct, "attributes.area.data.id", -1),
              ...get(favProduct, "attributes.area.data.attributes", {}),
            },
            author: get(favProduct, "attributes.user.data.attributes", {}),
          };
        });

        // this.favProducts = mappedfavProducts;
        this.favProducts = this.favProductCodes.map((code) =>
          mappedfavProducts.find((product) => product.code === code)
        );
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async updateFavProducts() {
      try {
        loading.show();
        const res = await HomepageConfig.updateConfig(1, {
          data: {
            products: {
              config: this.favProductCodes,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`cập nhật thành công!`);
        await this.fetchfavProductCodes();
        await this.fetchfavProducts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchfavProductCodes() {
      try {
        loading.show();
        const res = await HomepageConfig.fetchHomeConfig();
        if (!res) {
          alert.error(
            "Error occurred when fetching favProducts!",
            "Please try again later!"
          );
          return;
        }
        const favProductCodes = get(
          res,
          "data.data.[0].attributes.products.config",
          []
        );
        if (!favProductCodes && favProductCodes.length == 0) return;
        this.favProductCodes = favProductCodes;
        console.log("favProductCodes", this.favProductCodes);
      } catch (error) {
        alert.error("Error occurred!", error.message);
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

    reset() {
      this.favProduct = {};
      this.searchKey = null;
      this.favProductCodes = null;
      this.favProduct = null;
      this.favProducts = null;
      this.favSearchProducts = null;
      this.favProductAccreditation = null;
      this.favProductCertification = null;
      this.favProductThumbnail = null;
    },
  },
});
/* eslint-enable */
