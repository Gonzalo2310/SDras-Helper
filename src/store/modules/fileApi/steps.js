import axios from 'axios'

const stepApi = {
  read: function (commit, currentProject) {
    axios
      .get('http://localhost:5000/file/read/steps/' + currentProject)
      .then(function (response) {
        commit('updateSteps', response.data.steps)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  },
  store: function (commit, list, currentProject) {
    let send = {'steps': list}
    axios.post('http://localhost:5000/file/store/' + currentProject,
      {
        file: 'steps',
        data: send
      })
      .then(function (response) {
        // console.log(response.data)
        commit('updateSteps', list)
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

export default stepApi
