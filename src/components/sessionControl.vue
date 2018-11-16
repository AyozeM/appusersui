<template>
  <section v-if="username">
    <p>{{$t('views.welcome')}} {{username}}</p>
    <button class="btn btn-secondary" @click="logOut">{{$t('views.logout')}}</button>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed:mapState(['username']),
  methods:{
    logOut(){
      this.$store.commit('logOut');
      this.$router.push('/login')
    }
  }
}
</script>
