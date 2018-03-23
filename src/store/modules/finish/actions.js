import axios from 'axios'
import { catchHandling } from '../common'

const payload = finish => ({ file: 'finish', data: { finish } })

const finishActions = {
  initFinishs ({commit}, currentProject) {
    axios.get('http://localhost:5000/file/read/finish/' + currentProject)
      .then(({ data }) => {
        commit('updateFinishs', data.finish)
      })
      .catch(catchHandling)
  },
  addFinish ({commit, state}, {element, currentProject}) {
    const list = [ ...state.listFinishs, element ]
    axios
      .post('http://localhost:5000/file/store/' + currentProject, payload(list))
      .then(_ => {
        commit('updateFinishs', list)
      })
      .catch(catchHandling)
  },
  removeFinish ({commit, state}, {name, currentProject}) {
    const position = state.listFinishs.findIndex(x => x.toUpperCase() === name.toUpperCase())
    if (position !== -1) {
      const list = [
        ...state.listFinishs.slice(0, position),
        ...state.listFinishs.slice(position + 1)
      ]
      axios
        .post('http://localhost:5000/file/store/' + currentProject, payload(list))
        .then(_ => {
          commit('updateFinishs', list)
        })
        .catch(catchHandling)
    }
  }
}

export default finishActions
