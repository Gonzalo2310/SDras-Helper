import mutations from './mutations'
import actions from './actions'

const languageSytem = {
  state: {
    availableSystemLanguage: ['es', 'en'],
    currentSystemLanguage: 'en',
    currentSystemMessage: []
  },

  mutations,

  actions,

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
