import structureApi from './fileApi/structure'

const structure = {
  state: {
    listStructure: [],
    maxId: 0
  },
  mutations: {
    updateStructure (state, list) {
      state.listStructure = list
    }
  },
  getters: {
    listStructure (state) {
      return state.listStructure
    },
    maxId (state) {
      searchMax(state, state.listStructure)
      return state.maxId
    }
  },
  actions: {
    updateListStructure ({commit}, destinyData) {
      structureApi.store(commit, destinyData.list, destinyData.currentProject)
      commit('updateStructure', destinyData.list)
    },
    initStructure ({commit}, current) {
      structureApi.read(commit, current)
    }
  }
}

const searchMax = function (state, list) {
  list.forEach(function (element) {
    if (element.id > state.maxId) state.maxId = element.id
    searchMax(state, element.children)
  })
}

export default structure
