<template>
  <section class="mt-5 mr-2">
    <!-- Mensajes -->
    <transition name="animate.css" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
        <alert :message="message.text" v-if="message.text" @finalizado="alertEnd" :severity="message.severity" :interval="2" />
    </transition>
    <h2 class="text-capitalize">{{$t(`views.lists.${resourceSingular}`)}}</h2>
    <!-- listado -->
    <div class="d-flex justify-content-center align-items-center h-100" v-if="spinner">
      <i class="fas fa-spinner fa-3x fa-pulse spinner" ></i>
    </div>
    <div class="row justify-content-end" v-if="userAuth > 1">
      <router-link to="add" class="btn btn-primary" append>{{ $t('buttons.add') }}&nbsp;&nbsp;<i class="fas fa-plus"></i></router-link>
      </div>
    <p class="row font-weight-bold border-bottom" v-show="!spinner">
      <span class="col-1">ID</span>
      <span class="col-3">{{$t('views.name')}}</span>
      <span class="col-3" v-show="resources[0].email">{{$t('views.email')}}</span>
    </p>
    <p v-for="(resourceItem,i) in resources" :key="i" class="row" v-if="!spinner">
      <span class="col-1 font-weight-bold">{{resourceItem.id}}</span>
      <span class="col-3">{{resourceItem.name}}</span>
      <span class="col-3">{{resourceItem.email}}</span>
      <router-link v-if="userAuth > 2" :to="`update/${resourceItem.id}`" class="btn btn-primary col-offet-1 mx-2" append>{{ $t('buttons.edit') }}&nbsp;&nbsp;<i class="fas fa-pencil-alt"></i></router-link>
      <button v-if="userAuth > 2" class="btn btn-danger  col-offet-1 mx-2" @click="remove(resourceItem.id)">{{ $t('buttons.remove') }}&nbsp;&nbsp;<i class="fas fa-trash-alt"></i></button>
    </p>
  </section>
</template>

<script>
import alert from "../components/message";
import * as crudService from "../services/crudService";
import {mapState} from 'vuex';
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
  computed:{
    ...mapState(['userAuth']),
    resourceSingular(){
      return this.resource.substr(0,this.resource.length-1);
    }
  },
  methods: {
    getInfo() {
      crudService
        .getAll(this.resource)
        .then(resources => (this.resources = resources.data))
        .catch(error => {
          console.error(error);
          this.message.severity = 'danger';
          this.message.text = this.$t('messages.error.unexpected')
          })
        .then(() => {
          this.spinner = false;
        });
    },
    remove(id) {
      if (confirm("¿Está seguro?, esta acción no se podrá deshacer")) {
        crudService
          .remove(this.resource, id)
          .then(message => {
            this.message.text = this.$t('messages.info.remove');
            this.message.severity = "success";
            this.resources.splice(this.resources.findIndex(e => e.id == id), 1);
          })
          .catch(error => {
            console.error(error);
            this.message.text = this.$t('messages.error.remove');
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
        this.spinner = true;
        this.getInfo();
      }
    }
  }
};
</script>
