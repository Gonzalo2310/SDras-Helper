import mutations from './mutations'
import actions from './actions'

const languageSytem = {
  state: {
    availableSystemLanguage: ['es', 'en'],
    currentSystemLanguage: 'en',
    currentSystemMessage: []
  },
  mutations,
  actions
}

export default languageSytem
