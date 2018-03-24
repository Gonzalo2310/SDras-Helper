function changer (property) {
  return function (state, elem) {
    state[name] = elem
  }
}

const mutationsLanguageSystem = {
  changeCurrentSystemLanguage: changer('currentSystemLanguage'),

  changeCurrentSystemMessage: changer('currentSystemMessage'),

  changeAvailableSystemLanguage: changer('availableSystemLanguage')
}

export default mutationsLanguageSystem
