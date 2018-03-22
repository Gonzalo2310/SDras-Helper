import axios from 'axios'
import { catchHandling } from './common'

const stepApi = {
  read: function (commit, currentProject) {
    axios
      .get('http://localhost:5000/file/read/steps/' + currentProject)
      .then(({ data }) => {
        commit('updateSteps', data.steps)
      })
      .catch(catchHandling)
  },
  store: function (commit, list, currentProject) {
    const payload = {
      file: 'steps',
      data: {'steps': list}
    }
    axios.post('http://localhost:5000/file/store/' + currentProject, payload)
      .then(_ => {
        // console.log(response.data)
        commit('updateSteps', list)
      })
      .catch(catchHandling)
  }
}

export default stepApi
