<template>
  <div class="register-main-box">
    <div class="register-left-box">
      <h1>Hi!</h1>
      <h1>欢迎加入贝壳精选</h1>
      <h1>如果您已有账号</h1>
      <button @click="goLogin()">立即登陆</button>
    </div>
    <div class="register-right-box">
      <loginForm />
    </div>
  </div>
</template>

<script>
import loginForm from "../components/loginForm.vue";
export default {
  data() {
    return {};
  },

  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
  },

  components: {
    loginForm,
  },
};
</script>

<style lang="less" scoped>
.register-main-box {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #0059aa;

  .register-left-box {
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 40vw;
    height: 30%;
    float: left;
    background-color: #0059aa;

    h1:first-child {
      color: yellow;
      transform: translate(-100px);
    }

    h1:nth-child(2) {
      color: #fff;
    }

    h1:nth-child(3) {
      color: #fff;
    }

    button {
      width: 80%;
      height: 50px;
      font-size: 15px;
      color: #0e6ebe;
      border-radius: 20px;
      border: none;
    }
  }

  .register-right-box {
    width: 60vw;
    height: 100%;
    float: left;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
