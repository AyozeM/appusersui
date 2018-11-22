<template>
  <section class="mt-4">
    <!-- Mensajes -->
    <transition name="animate.css" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
      <alert :message="message.text" v-if="message.text" @finalizado="alertEnd" :severity="message.severity" :interval="2" :title="message.title" />
    </transition>
    <header class="d-flex border-bottom justify-content-center">
      <h1>{{$t('views.register')}}</h1>
    </header>
    <div class="row justify-content-center">
      <form @submit.prevent="createAccount" class="row flex-column col-lg-4">
        <label for="name">
          <span>{{$t('views.name')}}</span>
          <input type="text" name="name" id="name" class="form-control" v-model.trim="form.name">
        </label>
        <label for="email">
          <span>{{$t('views.email')}}</span>
          <input type="email" name="email" id="email" class="form-control" v-model="form.email">
        </label>
        <router-link to="/login" class="m-2">{{$t('views.backLogin')}}</router-link>
        <button-loading :isLoading="showSpinner">
          <span>{{$t('views.create')}}</span>
        </button-loading>
      </form>
    </div>
  </section>
</template>

<script>
import buttonLoading from "../components/loadingButton";
import { createNewAccount } from "../services/crudService.js";
import alert from '../components/message';
export default {
  components: { buttonLoading, alert },
  data() {
    return {
      form: {
        name: "",
        email: ""
      },
      showSpinner: false,
      message:{
        title:null,
        text:null,
        severity:null
      }
    };
  },
  computed: {
    showButton() {
      return this.form.name.length > 0 && this.form.email.length > 0;
    }
  },
  methods: {
    createAccount() {
      this.showSpinner = true;
      createNewAccount(this.form)
        .then(ok => {
          this.message.title = this.$t('messages.success.checkEmail.title')
          this.message.text = this.$t('messages.success.checkEmail.text')
          this.message.severity = 'success'
        })
        .catch(error => {
          console.error(error);
          alert("el usuario no pudo ser creado");
        })
        .then(() => {
          this.showSpinner = false;
        });
    },
    alertEnd(){
      this.message.text = null;
      this.message.title = null;
      this.$router.push("/login");
    }
  }
};
</script>

