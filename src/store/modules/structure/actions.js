import axios from 'axios'
import { catchHandling, handlePromise } from '../common'

const handle = handlePromise('updateStructure')
const payload = structure => ({file: 'structure', data: {structure}})

const actionsStructure = {
  updateListStructure ({commit}, {list, currentProject}) {
    handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(list)), list)
  },

  initStructure ({commit}, current) {
    axios
      .get('http://localhost:5000/file/read/structure/' + current)
      .then(({ data }) => {
        commit('updateStructure', data.structure)
      })
      .catch(catchHandling)
  }
}

export default actionsStructure
