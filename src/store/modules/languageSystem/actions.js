const actionsLanguageSystem = {
  initSystemLanguage ({commit, state}) {
    import(`@/language/${state.currentSystemLanguage}/messages`)
      .then(dataMessages => {
        commit('changeCurrentSystemMessage', dataMessages)
      })
      .catch(error => {
        console.log(error)
      })
  },

  setCurrentSystemLanguage ({commit}, lng) {
    import(`@/language/${lng}/messages`)
      .then(dataMessages => {
        commit('changeCurrentSystemMessage', dataMessages)
      })
      .catch(error => {
        console.log(error)
      })
    commit('changeCurrentSystemLanguage', lng)
  }
}

export default actionsLanguageSystem
