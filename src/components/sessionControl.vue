<template>
  <section v-if="user_name">
    <p>{{$t('views.welcome')}} {{user_name}}</p>
    <button class="btn btn-secondary" @click="logOut">{{$t('views.logout')}}</button>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed:mapState(['user_name']),
  methods:{
    logOut(){
      this.$store.commit('logOut');
      this.$router.push('/login')
    }
  }
}
</script>
