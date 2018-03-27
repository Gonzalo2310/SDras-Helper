import actions from './actions'

const project = {
  state: {
    allProjects: [],
    currentProject: 'default'
  },
  mutations: {
    updateListProjects (state, list) {
      state.allProjects = list
    },

    updateCurrentProject (state, name) {
      state.currentProject = name
    }
  },
  getters: {
    getListProject: state => state.allProjects,

    getCurrentProject: state => state.currentProject
  },
  actions
}

export default project
