import actions from './actions'

/* const searchMax = elem =>
  Array.isArray(elem)
    ? Math.max(...elem.map(searchMax))
    : elem.hasOwnProperty('children') && elem.children.length !== 0
      ? Math.max(...elem.children.map(searchMax), elem.id)
      : elem.id */
const searchMax = function (state, list) {
  list.forEach(function (element) {
    if (element.id > state.maxId) state.maxId = element.id
    searchMax(state, element.children)
  })
}

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
    // maxId: state => searchMax(state.listStructure)
    maxId (state) {
      searchMax(state, state.listStructure)
      return state.maxId
    }
  },
  actions
}

export default structure
