<template>
<section>
    <!-- Mensajes -->
    <transition name="animate.css" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
        <alert :message="message.text" v-if="message.text" @finalizado="alertEnd" :severity="message.severity" :interval="2" />
    </transition>
    <!-- Formulario -->
    <h5 v-if="id">ID {{actualRol.id}}</h5>
    <label for="name">
      <span>{{ $t('views.name') }}</span>
      <input type="text" name="id" id="name" class="form-control" v-model="actualRol.name">
    </label>
    <div class="row">
    <elector :resource-list="actualRol.privileges" class="col-3" v-if="actualRol.privileges" :master="false" @remove-resource="removePrivilege">
      <p class="font-weight-bold">{{ $t('views.asig_priv') }}</p>
    </elector>
    <elector :resource-list="allPrivileges" class="col-3" v-if="allPrivileges && actualRol.privileges " :master="true" :assigned-resources="actualRol.privileges" @add-resource="addPrivilege" @remove-resource="removePrivilege">
      <p class="font-weight-bold">{{ $t('views.all_priv') }}</p>
    </elector>
    </div>
    <login-button :isLoading="showSpinner" @press-down="switchMehtod">
      <span v-if="id">{{ $t('buttons.update') }}</span>
      <span v-else>{{ $t('buttons.create') }}</span>
    </login-button>

</section>
</template>

<script>
import alert from "../components/message";
import loginButton from '../components/loadingButton';
import * as crudService from "../services/crudService.js";
import elector from "../components/resourceSelector/resourceElector.vue";
export default {
  components: { alert, elector, loginButton },
  mounted() {
    if (this.id) {
      crudService
        .getById("roles", this.id)
        .then(rol => {
          this.actualRol = rol.data;
        })
        .catch(error => {
          console.error(error);
          this.message = error;
        });
    }else{
      this.actualRol.privileges = []
    }
    crudService
      .getAll("privileges")
      .then(privileges => {
        this.allPrivileges = privileges.data;
      })
      .catch(error => {
        console.error(error);
        this.message = error;
      });
  },
  data() {
    return {
      message: {
        text:null,
        severity:'danger'
      },
      actualRol: {
        id: 0,
        name: null,
        privileges: null
      },
      allPrivileges: null,
      showSpinner: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id || null;
    }
  },
  methods: {
    alertEnd() {
      this.message.text = null;
    },
    addPrivilege(privilege){
      this.actualRol.privileges.push(privilege)
    },
    removePrivilege(privilege){
      this.actualRol.privileges.splice(this.actualRol.privileges.findIndex(e=> e.id == privilege.id),1);
    },
    switchMehtod(){
      this.showSpinner = true;

      const ok = () =>{
        this.message.text = this.id ? this.$t('messages.info.update') : this.$t('messages.info.add') ;
        this.message.severity = 'info'
      }
      const fail = error =>{
        console.error(error);
        this.message = this.$t('messages.error.update')
        this.message.severity = 'danger'
      }
      const final = () =>{
        this.showSpinner = false;
      }

      if(this.id){
        crudService.update('roles',this.actualRol).then(ok).catch(fail).then(final);
      }else{
        crudService.add('roles',this.actualRol).then(ok).catch(fail).then(final);
      }
    }
  }
};
</script>
