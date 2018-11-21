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
        <br>
        <label for="changePassword" class="btn btn-primary" :class="{active:changePassword.view}" v-show="id">
          <span>{{$t('views.changePassword')}}</span>
          <input type="checkbox" name="changePassword" id="changePassword" class="d-none" v-model="changePassword.view">
        </label>
        <section v-if="changePassword.view">
          <label for="newPassword">
            <span>{{$t('views.newPassword')}}</span>
            <input type="text" name="newPassword" id="newPassword" class="form-control" v-model="changePassword.newPassword.value" @blur="inputsBlur('newPassword')">
          </label>
          <label for="repearPassword">
            <span>{{$t('views.repeatPassword')}}</span>
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
    <loading-button :isLoading="showSpinner" @press-down="methodSwitch">
      <span v-if="id">{{ $t('buttons.update')}}</span>
      <span v-else>{{ $t('buttons.create')}}</span>
    </loading-button>
  </section>
</template>

<script>
import loadingButton from "../components/loadingButton";
import alert from "../components/message";
import * as crudService from "../services/crudService.js";
import elector from "../components/resourceSelector/resourceElector";
export default {
  components: { alert, elector, loadingButton },
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
      this.changePassword.view = true;
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
        password: null
      },
      allRoles: null,
      changePassword: {
        view: false,
        newPassword: {
          blur: false,
          value: ""
        },
        confirmPassword: {
          blur: false,
          value: ""
        }
      },
      showSpinner: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id || null;
    },
    valueNewPassword() {
      return (
        this.changePassword.newPassword.value ==
          this.changePassword.confirmPassword.value &&
        this.changePassword.newPassword.value.length > 1
      );
    }
  },
  methods: {
    inputsBlur(input) {
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
    methodSwitch() {
      this.showSpinner = true;
      const ok = () => {
        this.message.text = this.id
          ? this.$t("messages.info.update")
          : this.$t("messages.info.add");
        this.message.severity = "success";
      };
      const fail = error => {
        this.message.text = error;
        this.message.severity = "danger";
      };
      const final = () =>{
        this.showSpinner = false;
      }
      let failNewPassword = !this.changePassword.view || this.changePassword.newPassword.value == this.changePassword.confirmPassword.value && this.changePassword.newPassword.value.length > 0;

      if(failNewPassword){
        this.actualUser.password = this.changePassword.newPassword.value;
        if(this.id){
          crudService.update('users',this.actualUser).then(ok).catch(fail).then(final);
        }else{
          crudService.add('users',this.actualUser).then(ok).catch(fail).then(final);
        }
      }else{
        this.message.text = 'Las contraseñas han de coincidir';
        this.message.severity = 'danger';
        this.showSpinner = false;
      }
    },
  }
};
</script>

