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
          <div class="d-flex" @click="goToHome()">
            <v-img
              width="235px"
              height="64px"
              :src="require('@/assets/components/landing/web-logo-black.webp')"
            ></v-img>
          </div>
          <div class="d-flex flex-column full-width form-input">
            <div>
              <div class="text-dp-md font-weight-bold">Đăng nhập</div>
              <div class="text-md mt-2">
                Xin chào! Hãy nhập thông tin của bạn.
              </div>
            </div>
            <div class="text-sm neutral70--text font-weight-bold mt-6">
              Tài Khoản
            </div>
            <v-text-field
              height="36px"
              type="text"
              v-model="userStore.username"
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
              v-model="userStore.password"
              @click:append="isShowPass = !isShowPass"
              class="pa-0 mt-2"
              outlined
              placeholder="Nhập mật khẩu"
              dense
            />
          </div>
          <div
            class="d-flex align-center justify-space-between text-sm full-width remember-me"
          >
            <v-checkbox v-model="userStore.rememberMe">
              <template v-slot:label>
                <div class="text-sm font-weight-bold">Lưu mật khẩu</div>
              </template>
            </v-checkbox>
            <!-- <router-link
              to="/forgot-password"
              :style="{
                color: 'var(--v-blue60-base)',
              }"
              class="text-decoration-none font-weight-bold"
            >
              <div class="text-none nav-link">Quên mật khẩu</div>
            </router-link> -->
          </div>

          <v-btn
            class="mt-7 full-width border-radius-12"
            color="primary"
            height="56px"
            @click="submitForm"
            depressed
            ><span class="black--text text-none text-btn"
              >Đăng nhập</span
            ></v-btn
          >
          <div class="mt-6 text-md d-flex">
            <span>Chưa có tài khoản?</span>
            <router-link
              to="/register"
              :style="{
                color: 'var(--v-blue60-base)',
              }"
              class="text-decoration-none font-weight-bold ml-2"
            >
              <div class="text-none nav-link">Đăng ký ngay</div>
            </router-link>
          </div>
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
      <!-- <div>
        <v-img
          height="100vh"
          class="img-wrap"
          :src="require(`@/assets/components/landing/section1-right.webp`)"
          cover
        >
        </v-img>
      </div> -->
    </v-col>
  </v-row>
</template>

<script>
import { rules } from "@/plugins/rules";
import { userStore } from "@/stores/userStore";
import { mapStores } from "pinia";

export default {
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      rules: rules,
      isShow: true,
      isShowPass: false,
      imageUrls: [
        require("@/assets/components/landing/section1-right3.jpeg"),
        require("@/assets/components/landing/section1-right1.png"),
        require("@/assets/components/landing/section1-right2.jpeg"),
        require("@/assets/components/landing/section1-right4.jpeg"),
      ],
    };
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
        this.userStore.signIn();
      }
    },
    goToHome() {
      window.open("https://trungtamcaycanh.capylabs.io/");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
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
