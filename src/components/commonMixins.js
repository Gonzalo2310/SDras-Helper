import languageSystem from '../language/en/messages'
import { mapState } from 'vuex'

const common = {
  computed: {
    ...mapState(['languageSystem', 'project']),
    getCurrentProject () {
      return this.project.currentProject
    },
    systemLanguage () {
      return (this.languageSystem.currentSystemMessage.default) ? this.languageSystem.currentSystemMessage.default : languageSystem
    }
  }
}

export default common
