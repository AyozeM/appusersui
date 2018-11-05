<template>
<section>
    <!-- Mensajes -->
    <transition name="animate.css" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
        <alert :message="message.text" v-if="message.text" @finalizado="alertEnd" :severity="message.severity" :interval="2" />
    </transition>
    <!-- Formulario -->
    <h5>Formulario de roles</h5>
    <label for="id" v-if="id">
      <span>id</span>
      <input type="text" name="id" id="id" :value="actualRol.id" class="form-control" disabled>
    </label>
    <label for="name">
      <span>name</span>
      <input type="text" name="id" id="name" class="form-control" v-model="actualRol.name">
    </label>
    <div class="row">
    <elector :resource-list="actualRol.privileges" class="col-3" v-if="actualRol.privileges" :master="false" @remove-resource="removePrivilege">
      <p class="font-weight-bold">Privilegios asignados</p>
    </elector>
    <elector :resource-list="allPrivileges" class="col-3" v-if="allPrivileges && actualRol.privileges " :master="true" :assigned-resources="actualRol.privileges" @add-resource="addPrivilege" @remove-resource="removePrivilege">
      <p class="font-weight-bold">Todos los privilegios</p>
    </elector>
    </div>
    <button class="btn btn-primary" @click="udpateRol" v-if="id">Actualizar rol</button>
    <button class="btn btn-primary" @click="addRole" v-else>Añadir rol</button>
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
        this.message.text = 'rol actualizado';
        this.message.severity = 'info'
        //this.$router.push('/roles')
      }).catch(error=>{
        this.message = error;
        console.log(error);
      })
    },
    addRole(){
      crudService.add('roles',this.actualRol).then(()=>{
        this.message = 'rol añadido'
        this.$router.push('/roles')
      }).catch(error=>{
        this.message = error;
        console.log(error);
      })
    }
  }
};
</script>
