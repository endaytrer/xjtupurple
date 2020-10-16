import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue";
import Github from "../views/Github.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Code",
    component: Home,
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
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
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
  },
  {
    path: "/about",
    name: "About",
    component: About,
    props: true,
  },
  {
    path: "/github",
    name: "Github",
    component: Github,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
