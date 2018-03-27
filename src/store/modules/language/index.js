import actions from './actions'

const language = {
  state: {
    availableLanguage: []
  },
  mutations: {
    updateLanguage (state, list) {
      state.availableLanguage = list
    }
  },
  actions,
  getters: {
        // TODO: DEPRECATED - use the state instead a getter without any data change
    listLanguage (state) {
      console.log('DEPRECATED - use the state instead a getter without any data change')
      return state.availableLanguage
    }
  }
}

export default language
