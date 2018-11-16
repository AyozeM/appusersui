<template>
  <section class="justify-content-center mt-4">
    <!-- Mensajes -->
    <transition name="animate.css" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
      <alert :message="message.text" v-if="message.text" @finalizado="alertEnd" :severity="message.severity" :interval="2" />
    </transition>
    <header class="d-flex border-bottom justify-content-center">
      <h1>{{$t('views.login')}}</h1>
    </header>
    <div class="row justify-content-center">
      <form method="POST"  @submit.prevent="login" class="row flex-column col-lg-4">
        <label for="username" class="row">
          <span class="col-12 mb-2">{{$t('views.username')}}</span>
          <input type="text" name="username" id="username" v-model="form.name" class="form-control col-10" :class="{'is-invalid':checkers.name == false,'is-valid':checkers.name == true}" @blur="checkInvalidInput('name')" required>
        </label>
        <label for="password" class="row">
          <span class="col-12 mb-2">{{$t('views.password')}}</span>
          <input :type="typeInputPassword" name="password" id="password" v-model="form.password" class="form-control col-10" :class="{'is-invalid':checkers.password == false,'is-valid':checkers.password == true}" @blur="checkInvalidInput('password')" required>
          <label for="showPassword" class="btn btn-primary col-1 offset-lg-1">
            <input type="checkbox" id="showPassword" v-model="showPassword" class="d-none">
            <i class="far fa-eye" v-if="!showPassword"></i>
            <i class="far fa-eye-slash" v-else></i>
          </label>
        </label>
        <label for="remember" class="row">
          <span class="mr-2">{{$t('views.remember')}}</span>
          <checkbox-vue v-model="remember" id="remember"/>
        </label>
        <button class="btn btn-primary" type="submit" v-if="complete"><span>{{$t('views.login')}}</span><i v-show="showSpinner" class="fas fa-spinner fa-pulse spinner ml-3" ></i></button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { login,getAuthority } from "../services/crudService.js";
import checkboxVue from "bootstrap-vue/es/components/form-checkbox/form-checkbox";
import alert from '../components/message';
export default {
  components: { checkboxVue, alert },
  mounted() {
    let accessData = localStorage.getItem("accessData");
    if (accessData) {
      this.form = JSON.parse(accessData);
      this.login();
    }
  },
  data() {
    return {
      form: {
        name: null,
        password: null
      },
      checkers: {
        name: null,
        password: null
      },
      showPassword: false,
      remember: false,
      message: {
        text: null,
        severity: "danger"
      },
      showSpinner: false
    };
  },
  computed: {
    complete() {
      return this.form.name && this.form.password;
    },
    typeInputPassword() {
      return this.showPassword ? "text" : "password";
    }
  },
  methods: {
    alertEnd(){
      this.message.text = null;
    },
    login() {
      this.showSpinner = true;
      login(this.form)
        .then(token => {
          this.$store.commit("setToken", token.data.token);
          this.$store.commit("setUsername", this.form.name);
          return getAuthority(this.form.name);
        })
        .then(authority=>{

          this.$store.commit('setAuth', authority.data)
          if (this.remember) {
            localStorage.setItem("accessData", JSON.stringify({...this.form,authority:authority.data}));
          }
          this.$router.push("/users");
        })
        .catch(error => {
          this.checkers.name = false;
          this.checkers.password = false;
          this.message.text = 'Ha fallado la autenticacion, comprueba tu usuario o contraseña';
          console.error(error);
        });
    },
    checkInvalidInput(input) {
      this.checkers[input] = this.form[input] ? true : false;
    }
  }
};
</script>
