import axios from 'axios'
import { catchHandling } from './common'

const structureApi = {
  read (commit, current) {
    axios
      .get('http://localhost:5000/file/read/structure/' + current)
      .then(({ data }) => {
        commit('updateStructure', data.structure)
      })
      .catch(catchHandling)
  },
  store (commit, list, current) {
    const payload = {
      file: 'structure',
      data: {'structure': list}
    }
    axios.post('http://localhost:5000/file/store/' + current, payload)
      .then(_ => {
        commit('updateStructure', list)
      })
      .catch(catchHandling)
  }
}

export default structureApi
