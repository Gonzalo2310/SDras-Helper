import actions from './actions'
import getters from './getters'

const profile = {
  state: {
    dataProfile: {
      title: '',
      summary: '',
      url: '',
      generalTitle: ''
    }
  },
  mutations: {
    updateProfile (state, element) {
      state.dataProfile = element
    }
  },
  actions,
  getters
}

export default profile
