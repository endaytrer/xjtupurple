<template>
  <div class="mainContentContainer">
    <div class="dataContainer">
      <div class="title">
        <h3>当前时间：</h3>
      </div>
      <div class="timeDate">
        <div id="date">{{ nowDate }}</div>
        <div id="time">{{ nowTime }}</div>
        <p>已于 {{ reportDate }} {{ reportTime }} 完成报到登记</p>
        <p v-if="isPurple">
          外出时间<span class="green">{{ today }} {{ outTimeFrom }}</span
          >至<span class="green">{{ today }} {{ outTimeTo }}</span>
        </p>
      </div>
    </div>
    <div class="qrContainer">
      <div
        class="degreeBar"
        :class="{
          undergraduateBackground: isUndergraduate,
          graduateBackground: isGraduate,
          overseaBackground: isOversea,
        }"
      ></div>
      <p>{{ stuDegree }}</p>
      <div id="qrCodeDisplay"></div>
    </div>
    <div class="propaganda" v-if="isPurple">校园最安全，外出有风险</div>
    <div class="propaganda" v-if="isPurple">其他必须外出的情况</div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "QRCodeInterface",
  props: {
    reportDate: String,
    stuDegree: String,
    reportTime: String,
    outTimeFrom: String,
    outTimeTo: String,
    isUndergraduate: Boolean,
    isGraduate: Boolean,
    isOversea: Boolean,
    isPurple: Boolean,
    qrCode: String,
    colorOfCode: String,
  },
  data() {
    return {
      nowDate: "",
      nowTime: "",
      today: "",
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
    new QRCode("qrCodeDisplay", {
      text: "               " + this.qrCode + "               ",
      width: 150,
      height: 150,
      colorDark: this.colorOfCode,
      correctLevel: QRCode.CorrectLevel.H,
    });
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