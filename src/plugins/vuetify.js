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
        primary: "#3CCB7F",
        secondary: "#f5f8ff",

        //Neutral
        neutral10: "#F7F5F2",
        neutral20: "#E5E3E1",
        neutral30: "#CCCAC8",
        neutral40: "#B2B1AF",
        neutral50: "#999796",
        neutral60: "#807E7D",
        neutral70: "#666564",
        neutral80: "#4D4C4B",
        neutral90: "#333232",
        neutral100: "#1A1919",

        //Primary
        primary5: "#F6FEF9",
        primary10: "#EDFCF2",
        primary20: "#D3F8DF",
        primary30: "#AAF0C4",
        primary40: "#73E2A3",
        primary50: "#3CCB7F",
        primary60: "#16B364",
        primary70: "#099250",
        primary80: "#087443",
        primary90: "#095C37",
        primary100: "#084C2E",

        //yellow
        yellow5: "#FEFEF2",
        yellow10: "#FEFCEA",
        yellow20: "#FDF7C9",
        yellow30: "#FCEFA0",
        yellow40: "#F9E283",
        yellow50: "#F2C748",
        yellow60: "#E1AC3C",
        yellow70: "#CB7B36",
        yellow80: "#996535",
        yellow90: "#6C4725",
        yellow100: "#3D2815",

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
