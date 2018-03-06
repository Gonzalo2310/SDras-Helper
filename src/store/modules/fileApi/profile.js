import axios from 'axios'

const profileApi = {
  read: function (commit, current) {
    axios
      .get('http://localhost:5000/file/read/profile/' + current)
      .then(function (response) {
        commit('updateProfile', response.data.profile)
      })
      .catch(function (response) {
        if (response.data) {
          console.error(response.data.error)
        } else {
          console.log(response)
        }
      })
  },
  store: function (commit, element, current) {
    let send = {'profile': element}
    console.log(current)
    axios.post('http://localhost:5000/file/store/' + current,
      {
        file: 'profile',
        data: send
      })
      .then(function (response) {
        console.log(response)
        commit('updateProfile', element)
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

export default profileApi
