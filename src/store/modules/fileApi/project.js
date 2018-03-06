import axios from 'axios'

const projectApi = {
  read: function (commit) {
    axios
      .get('http://localhost:5000/file/read/project/basic')
      .then(function (response) {
        commit('updateListProjects', response.data.projects)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  },
  store: function (commit, list) {
    let send = {'projects': list}
    axios.post('http://localhost:5000/file/store/basic',
      {
        file: 'project',
        data: send
      })
      .then(function (response) {
        commit('updateListProjects', list)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  },
  create: function (commit, project) {
    axios.post('http://localhost:5000/file/create/' + project)
      .then(function (response) {
        console.log(response.data.response)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  },
  rename: function (commit, list, oldValue, newValue) {
    let me = this
    axios.post('http://localhost:5000/file/rename/' + oldValue + '/' + newValue)
      .then(function (response) {
        me.store(commit, list)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  },
  destroy: function (commit, list, name) {
    let me = this
    axios.post('http://localhost:5000/file/delete/' + name)
      .then(function (response) {
        me.store(commit, list)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  }
}

export default projectApi
