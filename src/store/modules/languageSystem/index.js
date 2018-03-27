import mutations from './mutations'
import actions from './actions'

const languageSytem = {
  state: {
    availableSystemLanguage: ['es', 'en'],
    currentSystemLanguage: 'en',
    currentSystemMessage: []
  },

  mutations,

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
      console.log('DEPRECATED - use the state instead a getter without any data change')
      return state.availableSystemLanguage
    },
    getCurrentSystemLanguage (state) {
      console.log('DEPRECATED - use the state instead a getter without any data change')
      return state.currentSystemLanguage
    },
    getCurrentSystemMessage (state) {
      console.log('DEPRECATED - use the state instead a getter without any data change')
      return state.currentSystemMessage
    }
  }
}

export default languageSytem
