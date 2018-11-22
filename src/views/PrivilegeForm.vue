<template>
  <section>
    <!-- Mensages -->
    <transition name="animate.css"
    enter-active-class="animated bounceInDown"
    leave-active-class="animated bounceOutUp">
      <alert :message="message" v-if="message" @finalizado="alertEnd" severity="warning" :interval="2"/>
    </transition>
    <!-- Formulario -->
    <h5 v-if="id">ID  {{privilege.id}}</h5>
    <div class="row">
      <label for="name">
        <span>{{ $t('views.name') }}</span>
        <input type="text" name="name" id="name" v-model="privilege.name" placeholder="Escriba el nombre del nuevo privilegio" class="form-control">
      </label>
      <div class="ml-3 d-flex
      flex-column justify-content-end pb-3">
        <span>{{$t('views.authorityLevel')}}</span>
        <radio-group v-model="privilege.authorization" :options="authorities" name="authorities"/>
      </div>
    </div>
    <loading-button :isLoading="showSpinner" @press-down="sendForm">
      <span v-if="id">{{ $t('buttons.update') }}</span>
      <span v-else>{{ $t('buttons.create') }}</span>
    </loading-button>
  </section>
</template>

<script>
import * as crudService from "../services/crudService.js";
import alert from "../components/message";
import radioGroup from "bootstrap-vue/es/components/form-radio/form-radio-group";
import loadingButton from "../components/loadingButton";
export default {
  components: { alert, radioGroup, loadingButton },
  mounted() {
    if (this.id) {
      crudService
        .getById("privileges", this.id)
        .then(privilege => {
          this.privilege = privilege.data;
        })
        .catch(error => {
          console.error(error);
          alert("hubo un error");
        });
    }
  },
  data() {
    return {
      showSpinner:false,
      message: null,
      privilege: {
        id: 0,
        name: null,
        authorization: null
      }
    };
  },
  computed: {
    id() {
      return this.$route.params.id || null;
    },
    authorities() {
      return [
        { text: this.$t("views.get"), value: 1 },
        { text: this.$t("views.add"), value: 2 },
        { text: this.$t("views.updateRemove"), value: 3 }
      ];
    }
  },
  methods: {
    sendForm() {
      this.showSpinner = true;
      if (this.id) {
        crudService
          .update("privileges", this.privilege)
          .then(() => {
            this.$router.push("/privileges");
          })
          .catch(error => {
            console.error(error);
            this.message = "no se ha podido actualizar el privilegio";
          }).then(()=>{
            this.showSpinner = true;
          });
      } else {
        crudService
          .add("privileges", this.privilege)
          .then(() => {
            this.$router.push("/privileges");
          })
          .catch(error => {
            console.error(error);
            this.message = "no su ha podido añadir el privilegio";
          }).then(()=> {
            this.showSpinner = false;
          });
      }
    },
    alertEnd() {
      this.message = null;
    }
  }
};
</script>
