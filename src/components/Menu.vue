<template>
  <div class="bottomBar">
    <router-link
      to="/"
      class="button"
      active-class="active"
      @click="this.activeButton = 0"
    >
      <MenuIcon class="icon" :active=" this.activeButton === 0"></MenuIcon>
      <p>交大校园码</p>
    </router-link>
    <router-link
      to="/settings"
      class="button"
      active-class="active"
      @click="this.activeButton = 1"
    >
      <MenuIcon class="icon" :active="this.activeButton === 1"></MenuIcon>
      <p>返校申请</p>
    </router-link>
    <router-link
      class="button"
      to="/about"
      active-class="active"
      @click="this.activeButton = 2"
    >
      <MenuIcon class="icon" :active="this.activeButton === 2"></MenuIcon>
      <p>外出申请</p>
    </router-link>
    <router-link
      to="/github"
      class="button"
      active-class="active"
      @click="
        () => {
          this.activeButton = 3;
        }
      "
    >
      <MenuIcon class="icon" :active="this.activeButton === 3"></MenuIcon>
      <p>转码申请</p>
    </router-link>
  </div>
</template>

<script>
import MenuIcon from "./MenuIcon";
export default {
  name: "Menu",
  components: {
    MenuIcon,
  },
  data() {
    return {
      activeButton: 0,
    };
  },
};
</script>

<style scoped>
.bottomBar {
  width: 100%;
  height: 59px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.button {
  text-decoration: none;
  cursor: default;
  width: 80px;
  font-size: 0.9em;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: rgb(146, 150, 156);
  align-items: center;
  justify-content: space-around;
}
.button p {
  /* position: absolute; */
  display: block;
  height: 1em;
  margin: 0 0 25px;
}
.icon {
  margin: 20px 0 0px;
  flex-grow: 1;
  flex-shrink: 0;
  height: 1.8em;
}
.active {
  color: rgb(106, 207, 209);
}
</style>