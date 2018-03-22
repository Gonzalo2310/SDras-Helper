import axios from 'axios'
import { catchHandling } from './common'

const profileApi = {
  read (commit, current) {
    axios.get('http://localhost:5000/file/read/profile/' + current)
      .then(({ data }) => {
        commit('updateProfile', data.profile)
      })
      .catch(catchHandling)
  },
  store (commit, element, current) {
    const payload = {
      file: 'profile',
      data: {'profile': element}
    }
    console.log(current)
    axios.post('http://localhost:5000/file/store/' + current, payload)
      .then(_ => {
        // console.log(response)
        commit('updateProfile', element)
      })
      .catch(catchHandling)
  }
}

export default profileApi
