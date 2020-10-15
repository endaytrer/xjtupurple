<template>
  <div class="home">
    <Banner
      :stu-no="stuNo"
      :stu-name="stuName"
      :stu-degree="stuDegree"
      :stu-position="stuPosition"
      :photoURL="photoURL"
      :photo-border-width="photoBorderWidth"
      :is-undergraduate="isUndergraduate"
      :is-graduate="isGraduate"
      :is-oversea="isOversea"
    ></Banner>
    <QRCodeInterface
      :nowDate="nowDate"
      :nowTime="nowTime"
      :reportDate="reportDate"
      :reportTime="reportTime"
      :isPurple="isPurple"
      :today="today"
      :outTimeFrom="outTimeFrom"
      :outTimeTo="outTimeTo"
      :isUndergraduate="isUndergraduate"
      :isGraduate="isGraduate"
      :isOversea="isOversea"
      :stuDegree="stuDegree"
      :qrCode="qrCode"
      :colorOfCode="colorOfCode"
    ></QRCodeInterface>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner";
import QRCodeInterface from "@/components/QRCodeInterface";

export default {
  name: "Home",
  components: {
    Banner,
    QRCodeInterface,
  },
  props: {
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
  data() {
    return {
      today: "",
      nowDate: "",
      nowTime: "",
      timingInterval: null,
    };
  },
  computed: {
    isUndergraduate() {
      return this.stuDegree === "本科生";
    },
    isGraduate() {
      return this.stuDegree === "研究生";
    },
    isOversea() {
      return this.stuDegree === "留学生";
    },
    isPurple() {
      return this.generateColorOfCode === "紫码";
    },
    colorOfCode() {
      switch (this.generateColorOfCode) {
        case "紫码":
          return "#F97AFB";
        case "绿码":
          return "#2BAA66";
        default:
          return "#F97AFB";
      }
    },
  },
  methods: {},
};
</script>
<style>
.home {
  width: 100%;
}
</style>
