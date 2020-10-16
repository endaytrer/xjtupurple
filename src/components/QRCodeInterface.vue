<template>
  <div class="mainContentContainer">
    <div class="dataContainer">
      <div class="title">
        <h3>当前时间：</h3>
      </div>
      <div class="timeDate">
        <div id="date">{{ nowDate }}</div>
        <div id="time">{{ nowTime }}</div>
        <p>
          已于 {{ personalData.reportDate }}
          {{ personalData.reportTime }} 完成报到登记
        </p>
        <p v-if="computedData.isPurple">
          外出时间<span class="green"
            >{{ today }} {{ personalData.outTimeFrom }}</span
          >至<span class="green">{{ today }} {{ personalData.outTimeTo }}</span>
        </p>
      </div>
    </div>
    <div class="qrContainer">
      <div
        class="degreeBar"
        :class="{
          undergraduateBackground: computedData.isUndergraduate,
          graduateBackground: computedData.isGraduate,
          overseaBackground: computedData.isOversea,
        }"
      ></div>
      <p>{{ personalData.stuDegree }}</p>
      <div id="qrCodeDisplay"></div>
    </div>
    <div class="propaganda" v-if="computedData.isPurple">
      校园最安全，外出有风险
    </div>
    <div class="propaganda" v-if="computedData.isPurple">
      其他必须外出的情况
    </div>
  </div>
</template>

<script>
export default {
  name: "QRCodeInterface",
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
      colorOfCode: String,
    },
  },
  data() {
    return {
      nowDate: "",
      nowTime: "",
      today: "",
      timingInterval: null,
    };
  },
  methods: {
    getTimeData() {
      // 获取时间并格式化
      let aDate = new Date();
      this.nowDate =
        (aDate.getMonth() + 1 <= 9
          ? "0" + (aDate.getMonth() + 1)
          : aDate.getMonth() + 1) +
        "月" +
        (aDate.getDate() <= 9 ? "0" + aDate.getDate() : aDate.getDate()) +
        "日";
      this.nowTime =
        (aDate.getHours() <= 9 ? "0" + aDate.getHours() : aDate.getHours()) +
        ":" +
        (aDate.getMinutes() <= 9
          ? "0" + aDate.getMinutes()
          : aDate.getMinutes()) +
        ":" +
        (aDate.getSeconds() <= 9
          ? "0" + aDate.getSeconds()
          : aDate.getSeconds());
      this.today =
        aDate.getFullYear() +
        "-" +
        (aDate.getMonth() + 1 <= 9
          ? "0" + (aDate.getMonth() + 1)
          : aDate.getMonth() + 1) +
        "-" +
        (aDate.getDate() <= 9 ? "0" + aDate.getDate() : aDate.getDate());
    },
    timer() {
      // 实时更新时间, 重制时钟间隔
      return setInterval(() => {
        this.getTimeData();
      }, 100);
    },
  },
  mounted() {
    this.timingInterval = this.timer();
  },
};
</script>

<style scoped>
.dataContainer {
  margin: -9px 0px 0px 25px;
  align-self: baseline;
}

.dataContainer h3 {
  color: rgb(146, 150, 156);
  font-weight: 500;
  font-size: 1.13em;
}

.timeDate {
  margin: -18px 0px;
}

#date {
  display: inline-block;
  font-size: 1.75em;
  font-weight: 600;
}

#time {
  margin-left: 15px;
  font-family: "Roboto-Bold", "Roboto Bold", "Roboto", sans-serif;
  font-size: 36px;
  display: inline-block;
  font-weight: 700;
}

.timeDate p {
  margin-top: 13px;
  font-size: 0.875em;
  width: auto;
}

.mainContentContainer {
  background-color: #fff;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
}

.qrContainer {
  position: relative;
  margin: 15px 0px 10px;
  align-self: center;
  width: 250px;
  height: 240px;
  border: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrContainer .degreeBar {
  align-self: flex-start;
  position: absolute;
  height: 30px;
  width: 136.14px;
  text-align: left;
}

.qrContainer .degreeBar::after {
  content: "";
  position: absolute;
  height: 30px;
  width: 19px;
  right: 0px;
  top: 0px;
  background-image: linear-gradient(-57.6deg, #fff 16px, transparent 0);
  box-shadow: 5px 5px 0px 5px white;
}

.qrContainer p {
  align-self: flex-start;
  position: relative;
  color: #fff;
  margin: 4px 36px 24px;
}
.propaganda {
  font-size: 0.9em;
  align-self: center;
}
</style>