
const languageSytem = {
  state: {
    availableSystemLanguage: ['es', 'en'],
    currentSystemLanguage: 'en',
    currentSystemMessage: []
  },
  mutations: {
    changeCurrentSystemLanguage (state, language) {
      state.currentSystemLanguage = language
    },
    changeCurrentSystemMessage (state, newObject) {
      state.currentSystemMessage = newObject
    },
    changeAvailableSystemLanguage (state, list) {
      state.availableSystemLanguage = list
    }
  },
  actions: {
    initSystemLanguage ({commit, state}) {
      import('../../language/' + state.currentSystemLanguage + '/messages')
        .then(dataMessages => {
          commit('changeCurrentSystemMessage', dataMessages)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setCurrentSystemLanguage ({commit}, lng) {
      import('../../language/' + lng + '/messages')
        .then(dataMessages => {
          commit('changeCurrentSystemMessage', dataMessages)
        })
        .catch(error => {
          console.log(error)
        })
      commit('changeCurrentSystemLanguage', lng)
    }
  },
  getters: {
    getAvailableSystemLanguage (state) {
      return state.availableSystemLanguage
    },
    getCurrentSystemLanguage (state) {
      return state.currentSystemLanguage
    },
    getCurrentSystemMessage (state) {
      return state.currentSystemMessage
    }
  }
}

export default languageSytem
