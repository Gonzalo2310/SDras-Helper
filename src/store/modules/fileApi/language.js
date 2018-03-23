import axios from 'axios'
import { catchHandling } from './common'

const languageApi = {
  read (commit, current) {
    axios.get('http://localhost:5000/file/read/language/' + current)
      .then(({ data }) => {
        commit('updateLanguage', data.language)
      })
      .catch(catchHandling)
  },
  store (commit, list, current) {
    const payload = {
      file: 'language',
      data: {'language': list}
    }
    axios.post('http://localhost:5000/file/store/' + current, payload)
      .then(_ => {
        commit('updateLanguage', list)
      })
      .catch(catchHandling)
  }
}

export default languageApi
