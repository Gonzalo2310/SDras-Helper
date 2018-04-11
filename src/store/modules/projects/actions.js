import axios from 'axios'
import { catchHandling, handlePromise } from '../common'

const handle = handlePromise('updateListProjects')
const payload = projects => ({file: 'project', data: {projects}})

const actionsProjects = {
  initAllProjects ({commit}) {
    axios
      .get('http://localhost:5000/file/read/project/basic')
      .then(({ data }) => {
        commit('updateListProjects', data.projects)
      })
      .catch(catchHandling)
  },

  addProjectToList ({commit, state}, project) {
    axios
      .post('http://localhost:5000/file/create/' + project)
      .then(({ data }) => {
        console.log(data.response)
        const list = [...state.allProjects, {name: project}]
        handle(commit, axios.post('http://localhost:5000/file/store/basic', payload(list)), list)
      })
      .catch(catchHandling)
  },

  removeProjectToList ({commit, state}, name) {
    const list = state.allProjects.filter(x => x.name !== name)
    axios.post('http://localhost:5000/file/delete/' + name)
      .then(_ => {
        handle(commit, axios.post('http://localhost:5000/file/store/basic', payload(list)), list)
      })
      .catch(catchHandling)
  },

  renameProjectToList ({commit, state}, {oldValue, newValue}) {
    const list = state.allProjects.map(x => {
      x.name = x.name === oldValue ? newValue : x.name
      return x
    })
    axios
      .post(`http://localhost:5000/file/rename/${oldValue}/${newValue}`)
      .then(_ => {
        handle(commit, axios.post('http://localhost:5000/file/store/basic', payload(list)), list)
      })
      .catch(catchHandling)
  },

  changeCurrentProject ({commit}, project) {
    commit('updateCurrentProject', project)
  }
}

export default actionsProjects
