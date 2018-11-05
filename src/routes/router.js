import Vue from 'vue';
import vueRouter from 'vue-router';
import dashboard from '../components/dashboard.vue';
import privilegesForm from '../views/PrivilegeForm.vue';
import resourceList from '../views/resourceList.vue';
import rolesForm from '../views/RolesForm.vue';
import usersForm from '../views/UsersForm.vue';
Vue.use(vueRouter);

const routes = [
  { path: '/', component: dashboard, redirect: "/users" },
  {
    path: '/users', component: dashboard, children: [
      { path: '', component: resourceList, props: { resource: 'users' } },
      { path: 'update/:id', component: usersForm },
      { path: 'add', component: usersForm }
    ]
  },
  {
    path: '/roles', component: dashboard, children: [
      { path: '', component: resourceList, props: { resource: 'roles' } },
      { path: 'update/:id', component: rolesForm },
      { path: 'add', component: rolesForm }
    ]
  },
  {
    path: '/privileges', component: dashboard, children: [
      { path: '', component: resourceList, props: { resource: 'privileges' } },
      { path: 'update/:id', component: privilegesForm },
      { path: 'add', component: privilegesForm },
    ]
  },
]

export const router = new vueRouter({ routes })
