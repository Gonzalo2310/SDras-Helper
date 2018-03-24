import axios from 'axios'
import { catchHandling, handlePromise } from '../common'

const payload = steps => ({file: 'steps', data: {steps}})
const handle = handlePromise('updateSteps')

const actionsSteps = {
  initSteps ({commit}, currentProject) {
    axios
      .get('http://localhost:5000/file/read/steps/' + currentProject)
      .then(({ data }) => {
        commit('updateSteps', data.steps)
      })
      .catch(catchHandling)
  },

  addStep ({commit, state}, {element, currentProject}) {
    const list = [...state.listSteps, element]
    handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(list)), list)
  },

  removeStep ({commit, state}, {currentProject}) {
    const position = state.listSteps.findIndex(x => x.name.toUpperCase() === name.toUpperCase())
    if (position !== -1) {
      let list = [...state.listSteps.slice(0, position), ...state.listSteps.slice(position + 1)]
      handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(list)), list)
    }
  }
}

export default actionsSteps
