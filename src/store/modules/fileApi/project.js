import axios from 'axios'
import { catchHandling } from './common'

const projectApi = {
  read (commit) {
    axios
      .get('http://localhost:5000/file/read/project/basic')
      .then(function (response) {
        commit('updateListProjects', response.data.projects)
      })
      .catch(catchHandling)
  },
  store (commit, list) {
    const payload = {
      file: 'project',
      data: {'projects': list}
    }
    axios.post('http://localhost:5000/file/store/basic', payload)
      .then(_ => {
        commit('updateListProjects', list)
      })
      .catch(catchHandling)
  },
  create (commit, project) {
    axios.post('http://localhost:5000/file/create/' + project)
      .then(({ data }) => {
        console.log(data.response)
      })
      .catch(catchHandling)
  },
  rename (commit, list, oldValue, newValue) {
    axios.post(`http://localhost:5000/file/rename/${oldValue}/${newValue}`)
      .then(respons => {
        this.store(commit, list)
      })
      .catch(catchHandling)
  },
  destroy (commit, list, name) {
    axios.post('http://localhost:5000/file/delete/' + name)
      .then(_ => {
        this.store(commit, list)
      })
      .catch(catchHandling)
  }
}

export default projectApi
