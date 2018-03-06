import Vuex from 'vuex'
import Vue from 'vue'
import language from './modules/language'
import finish from './modules/finishs'
import steps from './modules/steps'
import structure from './modules/structure'
import profile from './modules/profile'
import project from './modules/projects'
import languageSystem from './modules/languageSystem'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    language,
    finish,
    steps,
    structure,
    profile,
    project,
    languageSystem
  }
})

export default store
