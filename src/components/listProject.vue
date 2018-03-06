<template>
    <div>
        <div v-for="(item, index) in getListProject"
             :ref="index" :key="index">
            <el-radio border size="mini"
                      v-model="projectSelect"
                      :label="item.name">
                {{item.name}}
            </el-radio>
            <el-button type="text" size="mini" @click="openDialogRename(item.name)" v-if="item.name!='default'">{{systemLanguage.listproject.rename}}
            </el-button>
            <el-button type="text" size="mini" @click="openDialogRemove(item.name)" v-if="item.name!='default'">{{systemLanguage.listproject.delete}}
            </el-button>
        </div>
        <div class="mt10">
            <el-button type="primary" size="mini" @click="openDialog">{{systemLanguage.listproject.new}}</el-button>
        </div>
        <el-dialog
                :title="systemLanguage.listproject.modalTitle"
                :visible.sync="newProjectDialog"
                width="30%">
            <span>{{systemLanguage.listproject.messageDialog}}</span>
            <el-input v-model="newProjectName"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="newProjectDialog = false">{{systemLanguage.listproject.cancel}}</el-button>
    <el-button type="primary" @click="confirmDialog">{{systemLanguage.listproject.confirm}}</el-button>
  </span>
        </el-dialog>
        <el-dialog
                :title="systemLanguage.listproject.modalTitleRename"
                :visible.sync="renameProjectDialog"
                width="30%">
            <span>{{systemLanguage.listproject.messageDialogRename}}</span>
            <el-input v-model="renameProjectName"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="renameProjectDialog = false">{{systemLanguage.listproject.cancel}}</el-button>
    <el-button type="primary" @click="confirmDialogRename">{{systemLanguage.listproject.confirm}}</el-button>
  </span>
        </el-dialog>
        <el-dialog
                :title="systemLanguage.listproject.modalTitleRemove"
                :visible.sync="removeProjectDialog"
                width="30%">
            <span>{{systemLanguage.listproject.messageDialogRemove}}</span>
            <el-input :disabled="true" v-model="removeProjectName"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="removeProjectDialog = false">{{systemLanguage.listproject.cancel}}</el-button>
    <el-button type="primary" @click="confirmDialogRemove">{{systemLanguage.listproject.confirm}}</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import languageSystem from '../language/en/messages'

  export default {
    name: 'list-project',
    mounted: function () {
      this.initAllProjects()
    },
    data () {
      return {
        projectSelect: 'default',
        newProjectDialog: false,
        newProjectName: '',
        removeProjectDialog: false,
        removeProjectName: '',
        renameProjectDialog: false,
        renameProjectName: '',
        cacheProjectName: ''
      }
    },
    watch: {
      projectSelect: function (val) {
        this.changeCurrentProject(val)
        this.initStructure(this.getCurrentProject)
        this.initSteps(this.getCurrentProject)
        this.initProfile(this.getCurrentProject)
        this.initFinishs(this.getCurrentProject)
        this.initLanguage(this.getCurrentProject)
      }
    },
    methods: {
      ...mapActions([
        'initAllProjects',
        'initFinishs',
        'initLanguage',
        'initProfile',
        'initSteps',
        'initStructure',
        'addProjectToList',
        'changeCurrentProject',
        'removeProjectToList',
        'renameProjectToList']),
      openDialog () {
        this.newProjectName = ''
        this.newProjectDialog = true
      },
      confirmDialog () {
        if (this.newProjectName === '') return
        let find = 0
        let me = this
        this.getListProject.forEach(function (element) {
          if (element.name === me.newProjectName) find = 1
        })
        if (find) return
        this.addProjectToList(this.newProjectName)
        this.newProjectName = ''
        this.newProjectDialog = false
      },
      openDialogRename (name) {
        this.cacheProjectName = name
        this.renameProjectName = name
        this.renameProjectDialog = true
      },
      confirmDialogRename () {
        this.renameProjectToList({
          oldValue: this.cacheProjectName,
          newValue: this.renameProjectName
        })
        this.renameProjectDialog = false
        this.projectSelect = 'default'
      },
      openDialogRemove (name) {
        this.removeProjectName = name
        this.removeProjectDialog = true
      },
      confirmDialogRemove () {
        this.removeProjectToList(this.removeProjectName)
        this.removeProjectDialog = false
        this.projectSelect = 'default'
      }
    },
    computed: {
      ...mapGetters(['getListProject', 'getCurrentProject', 'getCurrentSystemMessage']),
      systemLanguage () {
        if (this.getCurrentSystemMessage.default) return this.getCurrentSystemMessage.default
        return languageSystem
      }
    }
  }
</script>
