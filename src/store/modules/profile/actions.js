import axios from 'axios'
import {catchHandling, handlePromise} from '../common'

const handle = handlePromise('updateProfile')
const payload = profile => ({file: 'profile', data: {profile}})

const actionsProfile = {
  initProfile ({commit}, currentProject) {
    axios.get('http://localhost:5000/file/read/profile/' + currentProject)
      .then(({data}) => {
        commit('updateProfile', data.profile)
      })
      .catch(catchHandling)
  },
  upgradeProfile ({commit}, {element, currentProject}) {
    handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(element)), element)
  }
}

export default actionsProfile
