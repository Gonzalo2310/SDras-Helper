import axios from 'axios'
import { catchHandling, handlePromise } from '../common'

const handle = handlePromise('updateFinishs')
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
    handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(list)), list)
  },

  removeFinish ({commit, state}, {name, currentProject}) {
    const position = state.listFinishs.findIndex(x => x.toUpperCase() === name.toUpperCase())
    if (position !== -1) {
      const list = [
        ...state.listFinishs.slice(0, position),
        ...state.listFinishs.slice(position + 1)
      ]
      handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(list)), list)
    }
  }
}

export default finishActions
