import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    light: true,
    themes: {
      light: {
        secondary: "#f5f8ff",

        //Neutral
        neutral10: "#F7F5F2",
        neutral20: "#E5E3E1",
        neutral30: "#CCCAC8",
        neutral40: "#B2B1AF",
        neutral50: "#999796",
        neutral60: "#807E7D",
        neutral70: "#666564",
        Neutral80: "#4D4C4B",
        Neutral90: "#333232",
        neutral100: "#1A1919",

        //Primary
        primary: "#FFE474",
        primary5: "#FEFEF2",
        primary10: "#FEFCEA",
        primary20: "#FDF7C9",
        primary30: "#FCEFA0",
        primary40: "#F9E283",
        primary50: "#F2C748",
        primary60: "#E1AC3C",
        primary70: "#CB7B36",
        primary80: "#996535",
        primary90: "#6C4725",
        primary100: "#3D2815",

        //Green
        green10: "#F4FEF6",
        green60: "#53B06C",
        green70: "#419056",

        //Red
        red10: "#FEF6F4",
        red60: "#DE5242",
        red70: "#C83E2E",

        //blue
        blue10: "#F5F8FF",
        blue60: "#2970FF",
        blue70: "#155EEF",

        //purple
        purple10: "#FEFAFF",
        purple60: "#BA24D5",
        purple70: "#9F1AB1",
      },
    },
  },
});
