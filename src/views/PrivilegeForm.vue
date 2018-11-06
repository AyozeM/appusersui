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
    <label for="name">
      <span>{{ $t('views.name') }}</span>
      <input type="text" name="name" id="name" v-model="privilege.name" placeholder="Escriba el nombre del nuevo privilegio" class="form-control">
    </label>
    <button class="btn btn-primary" @click="sendForm">
      <span v-if="id">{{ $t('buttons.update') }}</span>
      <span v-else>{{ $t('buttons.create') }}</span>
    </button>
  </section>
</template>

<script>
import * as crudService from "../services/crudService.js";
import alert from "../components/message";
export default {
  components: { alert },
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
  computed: {
    id() {
      return this.$route.params.id || null;
    }
  },
  data() {
    return {
      message: null,
      privilege: {
        id: 0,
        name: null
      }
    };
  },
  methods: {
    sendForm() {
      if (this.id) {
        crudService
          .update("privileges", this.privilege)
          .then(() => {
            this.$router.push("/privileges");
          })
          .catch(error => {
            console.error(error);
            this.message = "no se ha podido actualizar el privilegio";
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
          });
      }
    },
    alertEnd() {
      this.message = null;
    }
  }
};
</script>
