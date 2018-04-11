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
  actions
}

export default language
