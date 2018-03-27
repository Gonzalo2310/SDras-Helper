import stepApi from './fileApi/steps'

const steps = {
  state: {
    listSteps: []
  },
  mutations: {
    updateSteps (state, list) {
      state.listSteps = list
    }
  },
  actions: {
    initSteps ({commit}, currentProject) {
      stepApi.read(commit, currentProject)
    },
    addStep ({commit, state}, destinyData) {
      let list = state.listSteps
      list.push(destinyData.element)
      stepApi.store(commit, list, destinyData.currentProject)
    },
    removeStep ({commit, state}, destinyData) {
      let list = state.listSteps
      let position = -1
      list.forEach(function (element, index) {
        if (element.name.toUpperCase() === destinyData.name.toUpperCase()) position = index
      })
      if (position > -1) list.splice(position, 1)
      stepApi.store(commit, list, destinyData.currentProject)
    }
  },
  // TODO: DEPRECATED - use the state instead a getter without any data change
  getters: {
    listSteps (state) {
      console.log('DEPRECATED - use the state instead a getter without any data change')
      return state.listSteps
    }
  }
}

export default steps
