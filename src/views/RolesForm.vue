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
    <button class="btn btn-primary" @click="udpateRol" v-if="id">{{ $t('buttons.update') }}</button>
    <button class="btn btn-primary" @click="addRole" v-else>{{ $t('buttons.create') }}</button>
</section>
</template>

<script>
import alert from "../components/message";
import * as crudService from "../services/crudService.js";
import elector from "../components/resourceSelector/resourceElector.vue";
export default {
  components: { alert, elector },
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
      allPrivileges: null
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
    udpateRol(){
      crudService.update('roles',this.actualRol).then(()=>{
        this.message.text = this.$t('messages.info.update');
        this.message.severity = 'info'
      }).catch(error=>{
        this.message = this.$t('messages.error.update');
        console.log(error);
      })
    },
    addRole(){
      crudService.add('roles',this.actualRol).then(()=>{
        this.message = this.$t('messages.info.add')
        this.$router.push('/roles')
      }).catch(error=>{
        this.message = this.$t('messages.error.add');
        console.log(error);
      })
    }
  }
};
</script>
