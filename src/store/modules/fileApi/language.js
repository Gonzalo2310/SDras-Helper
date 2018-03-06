import axios from 'axios'

const languageApi = {
  read: function (commit, current) {
    axios
      .get('http://localhost:5000/file/read/language/' + current)
      .then(function (response) {
        commit('updateLanguage', response.data.language)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  },
  store: function (commit, list, current) {
    let send = {'language': list}
    axios.post('http://localhost:5000/file/store/' + current,
      {
        file: 'language',
        data: send
      })
      .then(function (response) {
        commit('updateLanguage', list)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  }
}

export default languageApi
