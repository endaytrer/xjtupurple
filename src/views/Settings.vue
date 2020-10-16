<template>
  <div class="fullsize">
    <div class="formContainer">
      <div class="placeTaker start"></div>
      <span>学号</span>
      <input
        class="inputBox"
        :value="modelValue.stuNo"
        @input="
          $emit(
            'update:modelValue',
            modifiedPersonalData('stuNo', $event.target.value)
          )
        "
      />
      <span>姓名</span>
      <input
        class="inputBox"
        :value="modelValue.stuName"
        @input="
          $emit(
            'update:modelValue',
            modifiedPersonalData('stuName', $event.target.value)
          )
        "
      />
      <span>书院和班级</span>
      <input
        class="inputBox"
        :value="modelValue.stuPosition"
        @input="
          $emit(
            'update:modelValue',
            modifiedPersonalData('stuPosition', $event.target.value)
          )
        "
      />
      <span>学位</span>
      <select
        class="inputBox"
        :value="modelValue.stuDegree"
        @input="
          $emit(
            'update:modelValue',
            modifiedPersonalData('stuDegree', $event.target.value)
          )
        "
      >
        <option value="本科生">本科生</option>
        <option value="研究生">研究生</option>
        <option value="留学生">留学生</option>
      </select>
      <span>生成码颜色</span>
      <select
        class="inputBox"
        :value="modelValue.generateColorOfCode"
        @input="
          $emit(
            'update:modelValue',
            modifiedPersonalData('generateColorOfCode', $event.target.value)
          )
        "
      >
        <option value="紫码">紫码</option>
        <option value="绿码">绿码</option>
      </select>
      <span>报到日期</span>
      <span class="warn" v-if="!validated.reportDate"
        >报到日期不合法! 格式: yyyy-MM-dd</span
      >
      <input
        class="inputBox"
        :value="modelValue.reportDate"
        @input="
          (event) => {
            $emit(
              'update:modelValue',
              modifiedPersonalData('reportDate', event.target.value)
            );
            validateData(
              'reportDate',
              /^\d{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/,
              event.target.value
            );
          }
        "
      />
      <span>报到时间</span>
      <span class="warn" v-if="!validated.reportTime"
        >报到时间不合法! 格式: hh:mm:ss(注意使用英文冒号)</span
      >
      <input
        class="inputBox"
        placehoder="11:45:14"
        :value="modelValue.reportTime"
        @input="
          (event) => {
            $emit(
              'update:modelValue',
              modifiedPersonalData('reportTime', event.target.value)
            );
            validateData(
              'reportTime',
              /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
              event.target.value
            );
          }
        "
      />
      <span>离校时间</span>
      <span class="warn" v-if="!validated.outTimeFrom"
        >离校时间不合法! 格式hh:mm(注意使用英文冒号)</span
      >
      <input
        class="inputBox"
        :value="modelValue.outTimeFrom"
        @input="
          (event) => {
            $emit(
              'update:modelValue',
              modifiedPersonalData('outTimeFrom', event.target.value)
            );
            validateData(
              'outTimeFrom',
              /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
              event.target.value
            );
          }
        "
      />
      <span>返校时间</span>
      <span class="warn" v-if="!validated.outTimeTo"
        >返校时间不合法! 格式hh:mm(注意使用英文冒号)</span
      >
      <input
        class="inputBox"
        :value="modelValue.outTimeTo"
        @input="
          (event) => {
            $emit(
              'update:modelValue',
              modifiedPersonalData('outTimeTo', event.target.value)
            );
            validateData(
              'outTimeTo',
              /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
              event.target.value
            );
          }
        "
      />
      <span>自定义二维码内容(留空以随机生成)</span>
      <input
        class="inputBox"
        :value="modelValue.qrCode"
        @input="
          (event) => {
            $emit(
              'update:modelValue',
              modifiedPersonalData('qrCode', event.target.value)
            );
          }
        "
        @focusout="
          (event) => {
            if (!event.target.value) {
              $emit(
                'update:modelValue',
                modifiedPersonalData('qrCode', generateCode())
              );
            }
          }
        "
      />
      <span>照片</span>
      <label for="imageUploadinput"></label>
      <input
        type="file"
        name="imageUpload"
        id="imageUploadinput"
        accept="image/*"
        @change="(event) => changeImage(event)"
      />
      <span>照片边框宽度</span>
      <vue-slider
        class="widthSlider"
        :modelValue="modelValue.photoBorderWidth"
        @change="(val) => modifiedPersonalData('photoBorderWidth', val)"
        :contained="true"
        :min="0"
        :max="18"
      ></vue-slider>
      <Banner
        class="preview"
        :class="{
          undergraduateBackground: isUndergraduate,
          graduateBackground: isGraduate,
          overseaBackground: isOversea,
        }"
        :personalData="modelValue"
        :computedData="computedData"
      ></Banner>

      <span
        ><button id="copyButton" data-clipboard-target="#copyUrlTarget">
          复制</button
        ><span>任意访问URL: </span></span
      >
      <input
        id="copyUrlTarget"
        class="inputBox"
        type="text"
        readonly="readonly"
        :value="computedURL"
      />

      <button class="submitButton" id="submitButton" @click="writeInfoToCache">
        保存
      </button>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import ClipboardJS from "clipboard";
import queryString from "query-string";
export default {
  name: "Settings",
  components: { VueSlider, Banner },
  props: {
    modelValue: {
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
  data() {
    return {
      validated: {
        reportDate: false,
        reportTime: false,
        outTimeFrom: false,
        outTimeTo: false,
      },
    };
  },
  mounted() {
    new ClipboardJS("#copyButton");
  },
  created() {
    this.validateData(
      "reportDate",
      /^\d{4}-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/,
      this.modelValue.reportDate
    );
    this.validateData(
      "reportTime",
      /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      this.modelValue.reportTime
    );
    this.validateData(
      "outTimeFrom",
      /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      this.modelValue.outTimeFrom
    );
    this.validateData(
      "outTimeTo",
      /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      this.modelValue.outTimeTo
    );
  },
  methods: {
    modifiedPersonalData(key, value) {
      let modifiedData = this.modelValue;
      modifiedData[key] = value;
      return modifiedData;
    },
    changeImage(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        event.target.$emit(
          "update:modelValue",
          this.modifiedPersonalData("photoURL", reader.result)
        );
      });
    },
    /**
     * @param pattern {RegExp}
     */
    async validateData(key, pattern, value) {
      this.validated[key] = pattern.test(value);
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
    writeInfoToCache() {
      localStorage.setItem("stuNo", this.modelValue.stuNo);
      localStorage.setItem("stuName", this.modelValue.stuName);
      localStorage.setItem("stuPosition", this.modelValue.stuPosition);
      localStorage.setItem("stuDegree", this.modelValue.stuDegree);
      localStorage.setItem("reportDate", this.modelValue.reportDate);
      localStorage.setItem("reportTime", this.modelValue.reportTime);
      localStorage.setItem("outTimeFrom", this.modelValue.outTimeFrom);
      localStorage.setItem("outTimeTo", this.modelValue.outTimeTo);
      localStorage.setItem("qrCode", this.modelValue.qrCode);
      localStorage.setItem("photoUrl", this.modelValue.photoURL);
      localStorage.setItem(
        "generateColorOfCode",
        this.modelValue.generateColorOfCode
      );
      localStorage.setItem(
        "photoBorderWidth",
        this.modelValue.photoBorderWidth
      );
      alert("保存成功!");
    },
  },
  computed: {
    computedURL() {
      return (
        document.URL.split("/")[0] +
        "//" +
        document.URL.split("/")[2] +
        "/?" +
        queryString.stringify(this.modelValue)
      );
    },
    isUndergraduate() {
      return (
        this.modelValue.stuDegree !== "研究生" &&
        this.modelValue.stuDegree !== "留学生"
      );
    },
    isGraduate() {
      return this.modelValue.stuDegree === "研究生";
    },
    isOversea() {
      return this.modelValue.stuDegree === "留学生";
    },
    isPurple() {
      return this.modelValue.generateColorOfCode === "紫码";
    },
    colorOfCode() {
      switch (this.modelValue.generateColorOfCode) {
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
};
</script>

<style scoped>
.placeTaker.start {
  width: 100%;
  height: 206px;
}
.preview {
  position: fixed;
  align-self: center;
  width: 100%;
  margin: 0 0 40px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}
.fullsize {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.formContainer {
  display: flex;
  flex-direction: column;
  color: #666;
  width: calc(100% - 100px);
  max-width: 500px;
  min-height: 100vh;
  /* padding: 20px; */
}

.inputBox {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 30px;
  width: 100%;
  font-size: 1.2em;
  padding: 2px 6px 2px;
  outline: none;
  border: none;
  background-color: #fff;
  border-radius: 7px;
}
input {
  margin: 2px 0 20px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.submitButton {
  align-self: center;
  font-size: 1.2em;
  font-weight: 600;
  background-color: rgb(111, 127, 245);
  color: #fff;
  width: 200px;
  height: 60px;
  outline: none;
  border: none;
  border-radius: 100px;
  transition: all ease-in-out 200ms;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 100px;
}

.submitButton:active {
  background-color: #8a97f7;
}
.photograph {
  margin: 5px 0 20px;
  align-self: center;
  object-fit: cover;
  width: 89px;
  height: 118px;
  background-color: #000;
  border: 8px solid #ffffff;
}

.undergraduateBackground {
  background-color: rgba(22, 113, 240, 0.6);
}

.graduateBackground {
  background-color: rgba(116, 71, 192, 0.6);
}

.overseaBackground {
  background-color: rgba(53, 58, 115, 0.6);
}
.widthSlider {
  margin: 5px 0 20px;
}
span.warn {
  color: #aaaa20;
}
</style>