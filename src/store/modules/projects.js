import projectApi from './fileApi/project'

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
  actions: {
    initAllProjects ({commit}) {
      projectApi.read(commit)
    },
    addProjectToList ({commit, state}, project) {
      projectApi.create(commit, project)
      let list = state.allProjects
      list.push({
        name: project
      })
      projectApi.store(commit, list)
    },
    removeProjectToList ({commit, state}, name) {
      let list = state.allProjects
      list.forEach(function (element, index) {
        if (element.name === name) {
          list.splice(index, 1)
        }
      })
      projectApi.destroy(commit, list, name)
    },
    renameProjectToList ({commit, state}, names) {
      let list = state.allProjects
      list.forEach(function (element, index) {
        if (element.name === names.oldValue) {
          list[index].name = names.newValue
        }
      })
      projectApi.rename(commit, list, names.oldValue, names.newValue)
    },
    changeCurrentProject ({commit}, project) {
      commit('updateCurrentProject', project)
    }
  },
  getters: {
    getListProject (state) {
      return state.allProjects
    },
    getCurrentProject (state) {
      return state.currentProject
    }
  }

}

export default project
