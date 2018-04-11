import actions from './actions'

const finishModule = {
  state: {
    listFinishs: []
  },
  mutations: {
    updateFinishs (state, list) {
      state.listFinishs = list
    }
  },
  actions
}

export default finishModule
