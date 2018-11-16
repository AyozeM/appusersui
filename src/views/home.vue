<template>
  <section class="row h-100">
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
      <li>
        <session-control class="ml-3"/>
      </li>
    </div>
    <div class="col-10">
    <router-view/>
    </div>
  </section>
</template>

<script>
import changeLanguage from '../components/changeLanguage';
import sessionControl from '../components/sessionControl';
export default {
  components:{changeLanguage,sessionControl},
}
</script>

