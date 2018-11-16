<template>
  <section class="container-fluid">
      <router-view/>
      <change-language :languages="languages" id="flags"/>
  </section>
</template>

<script>
import home from "./views/home";
import changeLanguage from "./components/changeLanguage";
export default {
  components: { home, changeLanguage },
  data() {
    return {
      languages: [
        {
          lang: "en",
          iso: "gb"
        },
        {
          lang: "es",
          iso: "es"
        }
      ]
    };
  }
};
</script>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
@import url("https://unpkg.com/animate.css@3.5.1/animate.min.css");
@import url("https://use.fontawesome.com/releases/v5.4.1/css/all.css");
/* html,
body {
  height: 100vh;
} */
#flags{
  position: absolute;
  top:0;
  right: 1vw;
}
</style>
