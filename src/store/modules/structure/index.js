import actions from './actions'

const searchMax = elem =>
  Array.isArray(elem)
    ? Math.max(...elem.map(searchMax))
    : elem.hasOwnProperty('children') && elem.children.length !== 0
      ? Math.max(...elem.children.map(searchMax), elem.id)
      : elem.id

const structure = {
  state: {
    listStructure: []
  },

  mutations: {
    updateStructure (state, list) {
      state.listStructure = list
    }
  },

  getters: {
    listStructure (state) {
      console.log('DEPRECATED - use the state instead a getter without data transformations')
      return state.listStructure
    },

    maxId: state => searchMax(state.listStructure)
  },

  actions
}

export default structure
