<template>
  <div class="home">
    <Banner :personalData="personalData" :computedData="computedData"></Banner>
    <QRCodeInterface
      :personalData="personalData"
      :computedData="computedData"
    ></QRCodeInterface>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner";
import QRCodeInterface from "@/components/QRCodeInterface";
import QRCode from "qrcodejs2";

export default {
  name: "Home",
  components: {
    Banner,
    QRCodeInterface,
  },
  props: {
    personalData: {
      stuNo: String, // 学号
      stuName: String, // 姓名
      stuPosition: String, // 学生书院/班级
      stuDegree: String, // 学生学位
      reportDate: String, // 学生报道日期
      reportTime: String, // 学生报道时间
      outTimeFrom: String, // 外出时间
      outTimeTo: String, // 入校时间
      photoURL: String, // 学生照片
      photoBorderWidth: Number,
      qrCode: String, // 生成的二维码
      generateColorOfCode: String,
    },
  },
  computed: {
    isUndergraduate() {
      return (
        this.personalData.stuDegree !== "研究生" &&
        this.personalData.stuDegree !== "留学生"
      );
    },
    isGraduate() {
      return this.personalData.stuDegree === "研究生";
    },
    isOversea() {
      return this.personalData.stuDegree === "留学生";
    },
    isPurple() {
      return this.personalData.generateColorOfCode === "紫码";
    },
    colorOfCode() {
      switch (this.personalData.generateColorOfCode) {
        case "紫码":
          return "#F97AFB";
        case "绿码":
          return "#2BAA66";
        default:
          return "#F97AFB";
      }
    },
    computedData() {
      return {
        isUndergraduate: this.isUndergraduate,
        isGraduate: this.isGraduate,
        isOversea: this.isOversea,
        isPurple: this.isPurple,
        colorOfCode: this.colorOfCode,
      };
    },
  },
  async mounted() {
    await new QRCode("qrCodeDisplay", {
      text: "               " + this.personalData.qrCode + "               ",
      width: 150,
      height: 150,
      colorDark: this.computedData.colorOfCode,
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
};
</script>
<style>
.home {
  width: 100%;
}
</style>
