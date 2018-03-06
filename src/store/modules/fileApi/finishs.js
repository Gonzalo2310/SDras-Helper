import axios from 'axios'

const finishApi = {
  read: function (commit, current) {
    axios
      .get('http://localhost:5000/file/read/finish/' + current)
      .then(function (response) {
        commit('updateFinishs', response.data.finish)
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
    let send = {'finish': list}
    axios.post('http://localhost:5000/file/store/' + current,
      {
        file: 'finish',
        data: send
      })
      .then(function (response) {
        commit('updateFinishs', list)
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

export default finishApi
