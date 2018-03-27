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
  actions,
  // TODO: DEPRECATED - use the state instead a getter without any data change
  getters: {
    listFinishs (state) {
      console.log('DEPRECATED - use the state instead a getter without any data change')
      return state.listFinishs
    }
  }
}

export default finishModule
