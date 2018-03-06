<template>
    <div>
        <span>{{getCurrentProject}}</span>
        <div class="grid-options-data">
            <div>
                <span class="input-label">{{systemLanguage.profile.name}}</span>
            </div>
            <div>
                <el-input type="text" v-model="titleProject"></el-input>
            </div>
            <div>
                <span class="input-label">{{systemLanguage.profile.summary}}</span>
            </div>
            <div>
                <el-input type="text" v-model="summaryProject"></el-input>
            </div>
            <div>
                <span class="input-label">{{systemLanguage.profile.url}}</span>
            </div>
            <div>
                <el-input type="text" v-model="urlProject"></el-input>
            </div>
            <div>
                <span class="input-label">{{systemLanguage.profile.generalTitle}}</span>
            </div>
            <div>
                <el-input type="text" v-model="generalTitleProject"></el-input>
            </div>
            <div></div>
            <div class="button-container">
                <el-button type="success" size="medium" @click="saveProfile">{{systemLanguage.profile.save}}</el-button>
                <el-button type="danger" size="medium" @click="resetProfile">{{systemLanguage.profile.reset}}
                </el-button>
            </div>
        </div>
        <span class="red" v-if="errorProfile">{{systemLanguage.profile.error}}</span>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import languageSystem from '../language/en/messages'

  export default {
    name: 'profile',
    mounted: function () {
      this.initProfile(this.getCurrentProject)
      let me = this
      setTimeout(function () {
        me.resetProfile()
      }, 500)
    },
    data () {
      return {
        titleProject: this.titleProfile,
        summaryProject: this.summaryProfile,
        urlProject: this.urlProfile,
        generalTitleProject: this.generalTitleProfile,
        errorProfile: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.resetProfile())
    },
    computed: {
      ...mapGetters([
        'profile',
        'titleProfile',
        'summaryProfile',
        'getCurrentProject',
        'getCurrentSystemMessage',
        'urlProfile',
        'generalTitleProfile'
      ]),
      systemLanguage () {
        if (this.getCurrentSystemMessage.default) return this.getCurrentSystemMessage.default
        return languageSystem
      }
    },
    methods: {
      ...mapActions(['initProfile', 'upgradeProfile']),
      saveProfile () {
        if (this.titleProject.trim() === '' || this.summaryProject === '') {
          this.errorProfile = true
          return
        }
        this.errorProfile = false
        let me = this
        this.upgradeProfile({
          element: {
            title: me.titleProject,
            summary: me.summaryProject,
            url: me.urlProject,
            generalTitle: me.generalTitleProject
          },
          currentProject: me.getCurrentProject
        })
      },
      resetProfile () {
        this.titleProject = this.titleProfile
        this.summaryProject = this.summaryProfile
        this.urlProject = this.urlProfile
        this.generalTitleProject = this.generalTitleProfile
      }
    }
  }
</script>

<style scoped>
    .input-label {
        display: inline-block;
        padding-top: 10px;
    }

    .grid-options-data {
        display: grid;
        grid-template-columns: 30% auto;
        grid-template-rows: 50px 50px 50px;
    }

    .button-container {
        text-align: center;
        padding: 20px;
    }

    .red {
        font-size: 12px;
        color: #dc143c;
    }
</style>
