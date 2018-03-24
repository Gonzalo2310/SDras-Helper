const gettersProfile = {
  profile: state => state.dataProfile,

  titleProfile: state => state.dataProfile.title,

  summaryProfile: state => state.dataProfile.summary,

  urlProfile: state => state.dataProfile.url,

  generalTitleProfile: state => state.dataProfile.generalTitle
}

export default gettersProfile
