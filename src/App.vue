<template>
  <section class="container-fluid row h-100">
    <div class="nav nav-pills flex-column col-2">
      <li class="nav-item">
        <router-link to="/users" active-class="active" class="nav-link">{{ $t('entities.user.many') }}</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/roles" active-class="active" class="nav-link">{{ $t('entities.role.many') }}</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/privileges" active-class="active" class="nav-link">{{ $t('entities.privilege.many') }}</router-link>
      </li>
    </div>
    <div class="col-10">
    <change-language :languages="languages"/>
    <router-view/>
    </div>
  </section>
</template>

<script>
import changeLanguage from './components/changeLanguage';
export default {
  components:{changeLanguage},
  data(){
    return{
      languages: [
        {
          lang:'en',
          iso:'gb'
        },
        {
          lang:'es',
          iso:'es'
        }
      ]
    }
  }
}
</script>

<style>
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');
@import url('https://unpkg.com/animate.css@3.5.1/animate.min.css');
@import url('https://use.fontawesome.com/releases/v5.4.1/css/all.css');
html,body{
  height: 100vh;
}
</style>

