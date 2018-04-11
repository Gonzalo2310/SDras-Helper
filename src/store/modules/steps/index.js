import actions from './actions'

const steps = {
  state: {
    listSteps: []
  },
  mutations: {
    updateSteps (state, list) {
      state.listSteps = list
    }
  },
  actions
}

export default steps
