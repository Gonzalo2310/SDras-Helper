import languageSystem from '../language/en/messages'
import {mapState} from 'vuex'

const common = {
  computed: {
    ...mapState(['languageSystem', 'project']),
    getCurrentProject () {
      return this.project.currentProject
    },
    systemLanguage () {
      if (this.languageSystem.currentSystemMessage.default) return this.languageSystem.currentSystemMessage.default
      return languageSystem
    }
  }
}

export default common
