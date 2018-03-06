import finishApi from './fileApi/finishs'

const finishs = {
  state: {
    listFinishs: []
  },
  mutations: {
    updateFinishs (state, list) {
      state.listFinishs = list
    }
  },
  actions: {
    initFinishs ({commit}, currentProject) {
      finishApi.read(commit, currentProject)
    },
    addFinish ({commit, state}, destinyData) {
      let list = state.listFinishs
      list.push(destinyData.element)
      finishApi.store(commit, list, destinyData.currentProject)
    },
    removeFinish ({commit, state}, destinyData) {
      let list = state.listFinishs
      let position = -1
      list.forEach(function (element, index) {
        if (element.name.toUpperCase() === destinyData.name.toUpperCase()) position = index
      })
      if (position > -1) list.splice(position, 1)
      finishApi.store(commit, list, destinyData.currentProject)
    }
  },
  getters: {
    listFinishs (state) {
      return state.listFinishs
    }
  }
}

export default finishs
