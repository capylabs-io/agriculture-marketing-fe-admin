<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row class="login-container">
    <v-col class="d-flex flex-column justify-center login-container" cols="6">
      <v-card flat class="mx-auto form">
        <v-form
          ref="form"
          lazy-validation
          class="full-width d-flex flex-column align-center justify-center"
        >
          <div @click="goToHome()">
            <div class="mx-auto logo-img">
              <v-img :src="require('@/assets/quochuy.png')" />
            </div>

            <div
              class="font-weight-bold green100--text text-xl text-center text-uppercase mt-4 mb-2"
            >
              cổng thông tin giới thiệu sản phẩm và truy xuất nguồn gốc hoa, cây
              cảnh tỉnh bến tre
            </div>
          </div>
          <div
            class="d-flex flex-column full-width form-input"
            v-if="!authenSelected"
          >
            <div class="text-md d-flex">
              <v-icon color="black"> mdi-arrow-left-thin </v-icon>
              <router-link
                to="/login"
                class="text-decoration-none font-weight-bold ml-2 black--text"
              >
                <div class="text-none nav-link">Quay lại</div>
              </router-link>
            </div>
            <div class="mt-2">
              <div class="text-dp-md font-weight-bold">Đăng ký</div>
              <div class="text-md mt-2">
                Xin chào! Hãy nhập thông tin của đồng chí.
              </div>
            </div>
            <div class="text-sm neutral70--text font-weight-bold mt-6">
              Chọn loại tài khoản
            </div>
            <v-select
              class="pa-0 mt-2"
              placeholder="Chọn loại tài khoản"
              v-model="userStore.userSignUpData.role"
              item-text="text"
              item-value="value"
              :rules="[$rules.required]"
              :items="role"
              flat
              solo
              outlined
              return-object
              @change="changeAccountCategory($event)"
              dense
            ></v-select>
            <div class="text-sm neutral70--text font-weight-bold mt-2">
              Email
            </div>
            <v-text-field
              height="36px"
              type="text"
              v-model="userStore.userSignUpData.email"
              :rules="rules.checkIdentifier"
              class="pa-0 mt-2"
              placeholder="Nhập tên tài khoản"
              outlined
              dense
            />
            <div class="text-sm neutral70--text font-weight-bold mt-2">
              Mật Khẩu
            </div>
            <v-text-field
              height="36px"
              :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="isShowPass ? 'text' : 'password'"
              :rules="rules.password"
              v-model="userStore.userSignUpData.password"
              @click:append="isShowPass = !isShowPass"
              class="pa-0 mt-2"
              outlined
              placeholder="Nhập mật khẩu"
              dense
            />
            <div class="text-sm neutral70--text font-weight-bold mt-2">
              Nhập lại mật khẩu
            </div>
            <v-text-field
              height="36px"
              :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="isShowPass ? 'text' : 'password'"
              :rules="[passwordConfirmationRule]"
              v-model="userStore.cfpassword"
              @click:append="isShowPass = !isShowPass"
              class="pa-0 mt-2"
              outlined
              placeholder="Nhập lại mật khẩu"
              dense
            />
          </div>
          <div v-else class="d-flex flex-column full-width form-input">
            <div class="text-md d-flex">
              <v-icon color="black"> mdi-arrow-left-thin </v-icon>
              <div
                @click="authenSelected = false"
                class="text-decoration-none font-weight-bold ml-2 black--text"
              >
                <div class="text-none nav-link">Quay lại</div>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-dp-md font-weight-bold">Đăng ký</div>
              <div class="text-md mt-2">
                Xin chào! Hãy nhập thông tin của đồng chí.
              </div>
            </div>

            <div class="text-sm neutral70--text font-weight-bold mt-6">
              Tên
              {{
                userStore.userSignUpData.role
                  ? userStore.userSignUpData.role.text
                  : ""
              }}
            </div>
            <v-text-field
              height="36px"
              type="text"
              v-model="userStore.metadata.name"
              class="pa-0 mt-2"
              placeholder="Nhập tên tài khoản"
              outlined
              dense
            />

            <div class="text-sm neutral70--text font-weight-bold mt-2">
              {{ !isArtisan ? " Danh mục" : "Danh xưng" }}
            </div>
            <v-select
              class="pa-0 mt-2"
              placeholder="Chọn danh mục"
              v-model="userStore.metadata.category"
              item-text="name"
              item-value="id"
              :items="htxStore.categories"
              flat
              solo
              outlined
              dense
            ></v-select>

            <div class="text-sm neutral70--text font-weight-bold mt-2">
              {{ !isArtisan ? "Mã số đăng ký kinh doanh" : "Số CMT / CCCD" }}
            </div>
            <v-text-field
              v-if="!isArtisan"
              height="36px"
              type="text"
              v-model="userStore.metadata.businessCode"
              class="pa-0 mt-2"
              placeholder="Nhập Mã số đăng ký kinh doanh"
              outlined
              dense
            />
            <v-text-field
              v-else
              height="36px"
              type="text"
              v-model="userStore.metadata.idNumber"
              class="pa-0 mt-2"
              placeholder="Nhập Số CMT / CCCD"
              outlined
              dense
            />
            <div class="text-sm neutral70--text font-weight-bold mt-2">
              {{ !isArtisan ? "Mã số thuế" : "Ngày cấp" }}
            </div>
            <v-text-field
              v-if="!isArtisan"
              height="36px"
              type="text"
              v-model="userStore.metadata.taxCode"
              class="pa-0 mt-2"
              placeholder="Nhập Ngày cấp"
              outlined
              dense
            />
            <v-text-field
              v-else
              height="36px"
              type="text"
              v-model="userStore.metadata.issuer"
              class="pa-0 mt-2"
              placeholder="Nhập Ngày cấp"
              outlined
              dense
            />
            <div class="text-sm neutral70--text font-weight-bold mt-2">
              {{ !isArtisan ? "Địa chỉ" : "Nơi cấp" }}
            </div>
            <v-text-field
              v-if="!isArtisan"
              height="36px"
              type="text"
              v-model="userStore.metadata.address"
              placeholder="Nhập Địa chỉ"
              outlined
              dense
            />
            <v-text-field
              v-else
              height="36px"
              type="text"
              v-model="userStore.metadata.issuer"
              placeholder="Nhập Nơi cấp"
              outlined
              dense
            />
          </div>
          <v-btn
            v-if="!authenSelected"
            :disabled="userStore.userSignUpData.role ? false : true"
            class="mt-7 full-width border-radius-12"
            color="primary"
            height="56px"
            @click="authenSelected = true"
            depressed
            ><span class="black--text text-none text-btn">Tiếp tục</span></v-btn
          >
          <v-btn
            v-else
            class="mt-7 full-width border-radius-12"
            color="primary"
            height="56px"
            @click="submitForm"
            depressed
            ><span class="black--text text-none text-btn"
              >Tạo tài khoản</span
            ></v-btn
          >
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="6" class="login-container">
      <v-carousel
        height="100vh"
        :interval="5000"
        show-arrows-on-hover
        hide-delimiter-background
        cycle
      >
        <v-carousel-item
          v-for="(url, i) in imageUrls"
          class="banner-img"
          :key="i"
          :src="url"
          cover
        >
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
import { rules } from "@/plugins/rules";
import { userStore } from "@/stores/userStore";
import { htxStore } from "@/views/htx/store/htx-store";
import { mapStores } from "pinia";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(htxStore),
    passwordConfirmationRule() {
      return () =>
        this.userStore.userSignUpData.password === this.userStore.cfpassword ||
        "Password must match";
    },
  },
  data() {
    return {
      rules: rules,
      isShow: true,
      isShowPass: false,
      isArtisan: false,
      authenSelected: false,
      role: [
        { value: "Artisan", text: "Nghệ nhân" },
        { value: "Store", text: "Đại lý" },
        { value: "Cooperative", text: "Hợp Tác Xã" },
      ],
      imageUrls: [
        require("@/assets/components/landing/section1-right3.jpeg"),
        require("@/assets/components/landing/section1-right1.png"),
        require("@/assets/components/landing/section1-right2.jpeg"),
        require("@/assets/components/landing/section1-right4.jpeg"),
      ],
    };
  },
  created() {
    this.htxStore.fetchCategories();
  },
  methods: {
    gotoRouter(url) {
      this.$router.push({
        params: "vn",
        name: url,
      });
    },
    change() {
      this.userStore.pageIndex = 3;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.userStore.signUp();
      }
    },
    goToHome() {
      window.open("https://trungtamcaycanh.capylabs.io/");
    },
    changeAccountCategory(category) {
      if (!category) return;
      console.log("category", category);
      if (category.value == "Artisan") {
        this.isArtisan = true;
      } else {
        this.isArtisan = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
}
.logo-img {
  width: 64px;
  height: 64px;
}
.form {
  width: 400px;
}
.form-input {
  margin-top: 80px;
}
.remember-me {
  height: 25px;
}
.banner-img {
  max-height: 100vh !important;
}
</style>
