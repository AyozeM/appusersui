<template>
  <section class="mt-4">
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
export default {
  components: { buttonLoading },
  data() {
    return {
      form: {
        name: "",
        email: ""
      },
      showSpinner: false
    };
  },
  computed: {
    showButton() {
      return this.form.name.length > 0 && this.form.email.length > 0;
    }
  },
  methods: {
    createAccount() {
      //this.showSpinner = !this.showSpinner;
      this.showSpinner = true;
      createNewAccount(this.form)
        .then(ok => {
          console.log(ok.data);
          this.$router.push("/login");
        })
        .catch(error => {
          console.error(error);
          alert("el usuario no pudo ser creado");
        })
        .then(() => {
          this.showSpinner = false;
        });
    }
  }
};
</script>

