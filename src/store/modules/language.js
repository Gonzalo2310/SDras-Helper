import languageApi from './fileApi/language'

const language = {
  state: {
    availableLanguage: []
  },
  mutations: {
    updateLanguage (state, list) {
      state.availableLanguage = list
    }
  },
  actions: {
    addLanguage ({commit, state}, destinyData) {
      setTimeout(() => {
        let list = state.availableLanguage
        list.push(destinyData.element)
        languageApi.store(commit, list, destinyData.currentProject)
      }, 500)
    },
    removeLanguage ({commit, state}, currentProject) {
      let list = state.availableLanguage.filter(function (element) {
        return !element.selected
      })
      languageApi.store(commit, list, currentProject)
    },
    initLanguage ({commit}, currentProject) {
      languageApi.read(commit, currentProject)
    },
    changeStateLanguage ({commit, state}, varState) {
      let result = state.availableLanguage
      result.forEach(function (element) {
        element.selected = varState
      })
      commit('updateLanguage', result)
    }
  },
  getters: {
    listLanguage: function (state) {
      return state.availableLanguage
    }
  }
}

export default language
