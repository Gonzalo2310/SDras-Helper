<template>
    <div>
        <el-tag class="mb10">{{getCurrentProject}}</el-tag>
        <div style="min-height: 10px"></div>
        <div v-if="getCurrentProject !='default'">
            <el-button type="primary"
                       @click="createProject"
                       :loading="loadingProject"
            >
                {{systemLanguage.project.title}}&nbsp;&nbsp;&nbsp;<i>{{getCurrentProject}}</i></el-button>
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
    data () {
      return {
        loadingProject: false
      }
    },
    methods: {
      ...mapActions([]),
      createProject () {
        this.loadingProject = true
        let me = this
        axios.post('http://localhost:5000/file/project/' + this.getCurrentProject)
          .then(function (response) {
            me.loadingProject = true
            me.$router.push('Admin')
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
