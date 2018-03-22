import axios from 'axios'
import { catchHandling } from './common'

const finishApi = {
  read (commit, current) {
    axios.get('http://localhost:5000/file/read/finish/' + current)
      .then(({ data }) => {
        commit('updateFinishs', data.finish)
      })
      .catch(catchHandling)
  },
  store: function (commit, list, current) {
    const payload = {
      file: 'finish',
      data: {'finish': list}
    }
    axios.post('http://localhost:5000/file/store/' + current, payload)
      .then(_ => {
        commit('updateFinishs', list)
      })
      .catch(catchHandling)
  }
}

export default finishApi
