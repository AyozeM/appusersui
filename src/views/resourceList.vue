<template>
  <section class="mt-5">
    <!-- Mensajes -->
    <transition name="animate.css" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
        <alert :message="message.text" v-if="message.text" @finalizado="alertEnd" :severity="message.severity" :interval="2" />
    </transition>
    <!-- listado -->
    <div class="d-flex justify-content-center align-items-center h-100" v-if="spinner">
      <i class="fas fa-spinner fa-3x fa-pulse spinner" ></i>
    </div>
    <div class="row justify-content-end">
      <router-link to="add" class="btn btn-primary" append>Añadir&nbsp;&nbsp;<i class="fas fa-plus"></i></router-link>
      </div>
    <p v-for="(resourceItem,i) in resources" :key="i" class="row" v-if="!spinner">
      <span class="col-1 font-weight-bold">{{resourceItem.id}}</span>
      <span class="col-3">{{resourceItem.name}}</span>
      <span class="col-3">{{resourceItem.email}}</span>
      <router-link :to="`update/${resourceItem.id}`" class="btn btn-primary col-offet-1 mx-2" append>Editar&nbsp;&nbsp;<i class="fas fa-pencil-alt"></i></router-link>
      <button class="btn btn-danger  col-offet-1 mx-2" @click="remove(resourceItem.id)">Eliminar&nbsp;&nbsp;<i class="fas fa-trash-alt"></i></button>
    </p>
  </section>
</template>

<script>
import alert from "../components/message";
import * as crudService from "../services/crudService";
export default {
  components: { alert },
  props: {
    resource: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      resources: null,
      spinner: true,
      message: {
        text: null,
        severity: null
      }
    };
  },
  methods: {
    getInfo() {
      crudService
        .getAll(this.resource)
        .then(resources => (this.resources = resources.data))
        .catch(error => console.error(error))
        .then(() => {
          this.spinner = false;
        });
    },
    remove(id) {
      if (confirm("¿Está seguro?, esta acción no se podrá deshacer")) {
        crudService
          .remove(this.resource, id)
          .then(message => {
            this.message.text = message.data;
            this.message.severity = "success";
            this.resources.splice(this.resources.findIndex(e => e.id == id), 1);
          })
          .catch(error => {
            console.error(error);
            this.message.text = 'Error fatal al eliminar';
            this.message.severity = 'danger'
          });
      }
    },
    alertEnd() {
      this.message.text = null;
    }
  },
  watch: {
    resource: {
      handler() {
        this.getInfo();
      }
    }
  }
};
</script>
