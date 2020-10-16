<template>
  <div
    class="topContainer"
    :class="{
      undergraduateBackground: computedData.isUndergraduate,
      graduateBackground: computedData.isGraduate,
      overseaBackground: computedData.isOversea,
    }"
  >
    <img
      :src="personalData.photoURL"
      class="photograph"
      alt="this is your photo"
      :style="{ borderWidth: '' + personalData.photoBorderWidth + 'px' }"
    />
    <div class="textContainer">
      <p>
        {{ personalData.stuNo }} {{ personalData.stuName }}
        <small class="smallText">{{ personalData.stuDegree }}</small>
      </p>
      <p>{{ personalData.stuPosition }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
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
    computedData: {
      isUndergraduate: Boolean,
      isGraduate: Boolean,
      isOversea: Boolean,
      isPurple: Boolean,
      colorOfCode: Boolean,
    },
  },
  computed: {},
};
</script>

<style scoped>
.topContainer {
  width: 100%;
  height: 166px;
  display: flex;
  align-items: center;
  transition: background-color ease-in-out 200ms;
}

.photograph {
  object-fit: cover;
  margin-left: 13px;
  width: 89px;
  height: 118px;
  background-color: #000;
  border: 8px solid #ffffff;
}

.textContainer {
  margin: 18px 20px;
  align-self: baseline;
  color: #fff;
}

.textContainer p:nth-child(2) {
  margin: -7px 0px;
}

.smallText {
  font-size: 0.88em;
  padding-left: 10px;
}


</style>
