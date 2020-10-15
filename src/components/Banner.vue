<template>
  <div
    class="topContainer"
    :class="{
      undergraduateBackground: isUndergraduate,
      graduateBackground: isGraduate,
      overseaBackground: isOversea,
    }"
  >
    <img
      :src="photoURL"
      class="photograph"
      alt="this is your photo"
      :style="{ borderWidth: photoBorderWidth + 'px' }"
    />
    <div class="textContainer">
      <p>
        {{ stuNo }} {{ stuName }}
        <small class="smallText">{{ stuDegree }}</small>
      </p>
      <p>{{ stuPosition }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    photoURL: String,
    photoBorderWidth: Number,
    stuNo: String,
    stuName: String,
    stuDegree: String,
    stuPosition: String,
    isUndergraduate: Boolean,
    isGraduate: Boolean,
    isOversea: Boolean,
  },
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
