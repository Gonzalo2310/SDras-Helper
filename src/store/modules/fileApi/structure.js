import axios from 'axios'

const structureApi = {
  read: function (commit, current) {
    axios
      .get('http://localhost:5000/file/read/structure/' + current)
      .then(function (response) {
        commit('updateStructure', response.data.structure)
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
    let send = {'structure': list}
    axios.post('http://localhost:5000/file/store/' + current,
      {
        file: 'structure',
        data: send
      })
      .then(function (response) {
        commit('updateStructure', list)
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

export default structureApi
