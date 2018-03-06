import profileApi from './fileApi/profile'

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
  actions: {
    initProfile ({commit}, currentProject) {
      profileApi.read(commit, currentProject)
    },
    upgradeProfile ({commit}, destinyData) {
      profileApi.store(commit, destinyData.element, destinyData.currentProject)
    }
  },
  getters: {
    profile (state) {
      return state.dataProfile
    },
    titleProfile (state) {
      return state.dataProfile.title
    },
    summaryProfile (state) {
      return state.dataProfile.summary
    },
    urlProfile (state) {
      return state.dataProfile.url
    },
    generalTitleProfile (state) {
      return state.dataProfile.generalTitle
    }
  }
}

export default profile
