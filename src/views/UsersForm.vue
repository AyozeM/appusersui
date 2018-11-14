<template>
  <section>
    <!-- Mensajes -->
    <transition name="animate.css" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
      <alert :message="message.text" v-if="message.text" @finalizado="alertEnd" :severity="message.severity" :interval="2" />
    </transition>
    <!-- Formulario -->
    <h5 v-if="id" >ID {{actualUser.id}}</h5>
    <div class="row">
      <div class="col-3 flex-row">
        <label for="name">
          <span>{{ $t('views.name') }}</span>
          <input type="text" name="name" id="name" v-model="actualUser.name" class="form-control">
        </label>
        <label for="email">
          <span>{{ $t('views.email') }}</span>
          <input type="email" name="email" id="email" v-model="actualUser.email" class="form-control">
        </label>
        <label for="password" v-if="!id">
          <span>{{$t('views.password')}}</span>
          <input type="text" name="password" id="password" v-model="actualUser.password" class="form-control">
        </label>
        <label for="changePassword" class="btn btn-primary" :class="{active:changePassword}">
          <span>Cambiar contraseña</span>
          <input type="checkbox" name="changePassword" id="changePassword" class="d-none" v-model="changePassword.view">
        </label>
        <section v-if="changePassword.view">
          <label for="newPassword">
            <span>Nueva contraseña</span>
            <input type="text" name="newPassword" id="newPassword" class="form-control" v-model="changePassword.newPassword.value" @blur="inputsBlur('newPassword')">
          </label>
          <label for="repearPassword">
            <span>Repita la contraseña</span>
            <input type="text" name="repearPassword" id="repearPassword" class="form-control" v-model="changePassword.confirmPassword.value" @blur="inputsBlur('confirmPassword')" :class="{'is-valid':valueNewPassword,'is-invalid':!valueNewPassword}">
          </label>
        </section>
      </div>
      <div class="row col-9">
        <elector :resource-list="actualUser.roles" v-if="actualUser.roles" class="col-4" :master="false" @remove-resource="removeRole">
          <p class="font-weight-bold">{{ $t('views.asig_rol')}}</p>
        </elector>
        <elector :resource-list="allRoles" v-if="actualUser.roles && allRoles" class="col-4" :master="true" @remove-resource="removeRole" @add-resource="addRole" :assigned-resources="actualUser.roles">
          <p class="font-weight-bold">{{ $t('views.all_rol') }}</p>
        </elector>
      </div>
    </div>
    <button class="btn btn-primary" v-if="id" @click="updateUser">{{ $t('buttons.update')}}</button>
    <button class="btn btn-primary" v-else @click="addUser">{{ $t('buttons.create')}}</button>
  </section>
</template>

<script>
import alert from "../components/message";
import * as crudService from "../services/crudService.js";
import elector from "../components/resourceSelector/resourceElector";
export default {
  components: { alert, elector },
  mounted() {
    if (this.id) {
      crudService
        .getById("users", this.id)
        .then(user => {
          this.actualUser = user.data;
        })
        .catch(error => {
          this.message.severity = "danger";
        });
    } else {
      this.actualUser.roles = [];
    }
    crudService
      .getAll("roles")
      .then(roles => {
        this.allRoles = roles.data;
      })
      .catch(error => {
        console.error(error);
        this.message.text = this.$t("messages.error.unexpected");
        this.message.severity = "danger";
      });
  },
  data() {
    return {
      message: {
        text: null,
        severity: "danger"
      },
      actualUser: {
        id: 0,
        name: null,
        email: null,
        roles: null,
        password:null
      },
      allRoles: null,
      changePassword:{
        view:true,
        newPassword:{
          blur:false,
          value:''
        },
        confirmPassword:{
          blur:false,
          value:''
        }
      },

    };
  },
  computed: {
    id() {
      return this.$route.params.id || null;
    },
    valueNewPassword(){
      return (this.changePassword.newPassword.value == this.changePassword.confirmPassword.value) && (this.changePassword.newPassword.value.length > 1 )
    }
  },
  methods: {
    inputsBlur(input){
      this.changePassword[input].blur = true;
    },
    alertEnd() {
      this.message.text = null;
    },
    addRole(role) {
      this.actualUser.roles.push(role);
    },
    removeRole(role) {
      this.actualUser.roles.splice(
        this.actualUser.roles.findIndex(e => e.id == role.id),
        1
      );
    },
    addUser() {
      crudService
        .add("users", this.actualUser)
        .then(() => {
          this.message.text = this.$t("messages.info.add");
          this.message.severity = "success";
        })
        .catch(error => {
          this.message.text = error;
          this.message.severity = "danger";
        });
    },
    updateUser() {
      if(this.changePassword.view && !this.valueNewPassword){
        this.message.text = 'Las contraseñas tienen que coincidir'
        this.message.severity = 'danger'
      }else{
        crudService
          .update("users", this.actualUser)
          .then(() => {
            this.message.text = this.$t("messages.info.update");
            this.message.severity = "success";
          })
          .catch(error => {
            this.message.text = error;
            this.message.severity = "danger";
          });
      }
    }
  }
};
</script>

