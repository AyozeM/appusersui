import Vue from 'vue';
import vueRouter from 'vue-router';
import dashboard from '../components/dashboard.vue';
import privilegesForm from '../views/PrivilegeForm.vue';
import resourceList from '../views/resourceList.vue';
import rolesForm from '../views/RolesForm.vue';
import usersForm from '../views/UsersForm.vue';
import loginComponent from '../views/login.vue';
import { store } from "../store/store";
import app from '../App.vue';
import home from '../views/home.vue';
Vue.use(vueRouter);

/* const routes = [
  {
    path: '/', component: app, children: [
      { path: '/login', component: loginComponent },
      {
        path: '/', component: home, children: [
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
      },
    ]
  },
] */

const routes = [
  { path: '/', component: app },
  { path: '/login', component: loginComponent },
  {
    path: '/**', component: home, children: [
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
  },

]

const router = new vueRouter({ routes })
router.beforeEach((to, from, next) => !store.state.userToken && to.path != '/login' ? next('/login') : next())
export { router };
