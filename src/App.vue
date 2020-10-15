<template>
  <div id="app">
    <router-view
      v-slot="{ Component }"
      :stuNo="stuNo"
      :stuName="stuName"
      :stuPosition="stuPosition"
      :stuDegree="stuDegree"
      :reportDate="reportDate"
      :reportTime="reportTime"
      :outTimeFrom="outTimeFrom"
      :outTimeTo="outTimeTo"
      :photoURL="photoURL"
      :photoBorderWidth="photoBorderWidth"
      :qrCode="qrCode"
      :generateColorOfCode="generateColorOfCode"
      :timingInterval="timingInterval"
      ><transition name="slide-right" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "./components/Menu";
export default {
  name: "App",
  components: {
    Menu,
  },
  data() {
    return {
      stuNo: "1234567890", // 学号
      stuName: "弗拉基米尔", // 姓名
      stuPosition: "俄罗斯莫斯科/克林姆林宫", // 学生书院/班级
      stuDegree: "本科生", // 学生学位
      reportDate: "2020-05-01", // 学生报道日期
      reportTime: "11:45:14", // 学生报道时间
      outTimeFrom: "00:00", // 外出时间
      outTimeTo: "23:59", // 入校时间
      photoURL: "/default.jpg", // 学生照片
      photoBorderWidth: 8,
      qrCode: "", // 生成的二维码
      generateColorOfCode: "紫码",
      timingInterval: null,
    };
  },
  methods: {
    changeImage() {
      // 更换图片
      const reader = new FileReader();
      const file = document.getElementById("imageUploadInput").files[0];
      reader.readAsDataURL(file);
      const that = this;
      reader.addEventListener(
        "load",
        function () {
          that.photoURL = reader.result;
        },
        false
      );
    },
    generateCode() {
      // 生成随机二维码数据
      let seq = "";
      const hexSeq = "0123456789ABCDEF";
      for (let index = 0; index < 32; index++) {
        seq += "" + hexSeq[Math.floor(Math.random() * 16)];
      }
      return seq;
    },
    created() {
      this.qrCode = this.generateCode();
    },
  },
};
</script>

<style>
body {
  width: 100%;
  overflow-x: hidden;
  background-color: rgb(249, 249, 249);
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  min-height: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.undergraduateBackground {
  background-color: #1671f0;
}

.graduateBackground {
  background-color: #7547c0;
}

.overseaBackground {
  background-color: #353a73;
}
.green {
  margin: 0px 5px;
  color: rgb(254, 192, 98);
}
</style>
