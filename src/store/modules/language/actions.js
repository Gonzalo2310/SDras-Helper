import axios from 'axios'
import { catchHandling, handlePromise } from '../common'

const handle = handlePromise('updateLanguage')

const payload = language => ({file: 'language', data: {language}})

const actionsLanguage = {
  addLanguage ({commit, state}, {element, currentProject}) {
    setTimeout(() => {
      const list = [...state.availableLanguage, element]
      handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(list)), list)
    }, 500)
  },

  removeLanguage ({commit, state}, currentProject) {
    const list = state.availableLanguage.filter(x => !x.selected)
    handle(commit, axios.post('http://localhost:5000/file/store/' + currentProject, payload(list)), list)
  },

  initLanguage ({commit}, currentProject) {
    axios
      .get('http://localhost:5000/file/read/language/' + currentProject)
      .then(({ data }) => {
        commit('updateLanguage', data.language)
      })
      .catch(catchHandling)
  },

  changeStateLanguage ({commit, state}, selected) {
    const result = state.availableLanguage.map(x => Object.assign({}, x, { selected }))
    commit('updateLanguage', result)
  }
}

export default actionsLanguage
