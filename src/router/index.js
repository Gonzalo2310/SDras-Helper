import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/front/home'
import Admin from '@/components/admin'
import listProject from '@/components/listProject'
import profile from '@/components/profile'
import language from '@/components/language'
import steps from '@/components/steps'
import finishs from '@/components/finish'
import structure from '@/components/structure'
import createProject from '@/components/createProject'
import route from '../final/routeFront'

const Error = {template: '<div>Error 404</div>'}

Vue.use(Router)
let routes = [
  {
    path: '*',
    name: 'Error 404',
    component: Error
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/List',
        name: 'List',
        component: listProject
      },
      {
        path: '/Profile',
        name: 'Profile',
        component: profile
      },
      {
        path: '/Language',
        name: 'Languages',
        component: language
      },
      {
        path: '/Steps',
        name: 'Steps',
        component: steps
      },
      {
        path: '/Finishs',
        name: 'Finishs',
        component: finishs
      },
      {
        path: '/Structure',
        name: 'Structure',
        component: structure
      },
      {
        path: '/Create',
        name: 'Create',
        component: createProject
      }
    ]
  }
]
route.forEach(function (element) {
  routes.push(element)
})
export default new Router({
  routes
})
