<template>
  <div class="fullsize">
    <div class="container">
      <span>学号 </span>
      <span>姓名</span>
      <span>书院和班级</span>
      <span>学位</span>
      <span>生成码颜色</span>
      <h4>报到日期</h4>
      <h4>报到时间</h4>
      <h4>离校时间</h4>
      <h4>返校时间</h4>
      <h4>自定义二维码内容(留空以随机生成)</h4>
      <h4>照片</h4>
      <input
        type="file"
        name="imageUpload"
        id="imageUploadInput"
        accept="image/*"
        @change="changeImage"
      />
      <h4>照片边框宽度</h4>
      <vue-slider
        class="widthSlider"
        :value="photoBorderWidth"
        width="230px"
        :data="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
      ></vue-slider>
      <h4>复制下面的URL以在任何地方访问该紫码</h4>
      <input readonly type="text" name="urlText" class="inputBox" />
      <button class="submitButton" id="submitButton" @click="writeInfoToCache">
        将信息保存到缓存
      </button>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
export default {
  name: "Settings",
  components: { VueSlider },
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
};
</script>

<style scoped>
.fullsize {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #666;
  width: calc(100% - 100px);
  max-width: 500px;
  min-height: 100vh;
  /* padding: 20px; */
}

.inputBox {
  height: 30px;
  width: 100%;
  font-size: 1.2em;
  outline: none;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 0px 20px 0px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.submitButton {
  background-color: #fff;
  font-size: 1.1em;
  width: 200px;
  height: 60px;
  outline: none;
  border: none;
  border-radius: 12px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.15), inset 0px 0px 0px transparent;
  margin: 30px 50px 20px;
  transition: all ease-in-out 200ms;
}

.submitButton:active {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0),
    inset 3px 3px 12px rgba(0, 0, 0, 0.15);
}
</style>