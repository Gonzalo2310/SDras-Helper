<template>
    <div>
        <div v-if="getCurrentProject !='default'">
        <el-button type="primary"
                   @click="createProject">
            {{systemLanguage.project.title}} {{getCurrentProject}}</el-button>
        </div>
        <div v-else>
            {{systemLanguage.project.error}}
        </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import languageSystem from '../language/en/messages'
  import axios from 'axios'

  export default {
    name: 'create-project',
    methods: {
      ...mapActions([]),
      createProject () {
        axios.post('http://localhost:5000/file/project/' + this.getCurrentProject)
          .then(function (response) {
            location.reload()
          })
          .catch(function (response) {
            if (response.data) {
              console.error(response.data.error)
            } else {
              console.log(response)
            }
          })
      }
    },
    computed: {
      ...mapGetters(['getCurrentProject', 'getCurrentSystemMessage']),
      systemLanguage () {
        if (this.getCurrentSystemMessage.default) return this.getCurrentSystemMessage.default
        return languageSystem
      }
    }
  }
</script>
