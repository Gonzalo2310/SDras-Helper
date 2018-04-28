<template>
    <div>
        <el-tag class="mb10">{{getCurrentProject}}</el-tag>
        <h3>{{ systemLanguage.steps.title }}</h3>
        <el-button type="success" size="medium" @click="actionStep('create')">{{ systemLanguage.steps.new }}</el-button>
        <div style="min-height: 10px"></div>
        <table-special
                @select="selectStep"
                :list="listSteps"
                :list-label="[
                systemLanguage.steps.table.title,
                systemLanguage.steps.table.name,
                systemLanguage.steps.table.description]"></table-special>
        <el-dialog
                title="Create the step"
                :visible.sync="stepModalCreate">
            <span>{{ systemLanguage.steps.required }}</span>
            <el-row class="mt10">
                <el-col :span="6">
                    <span>{{ systemLanguage.steps.name }}</span>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="stepBaseName"></el-input>
                    <span>{{ systemLanguage.steps.identify }}</span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">
                    {{ systemLanguage.steps.modalTitle }}
                </el-col>
                <el-col :span="18">
                    <el-input v-model="stepBasetitle"></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">{{ systemLanguage.steps.description }}</el-col>
                <el-col :span="18">
                    <el-input v-model="stepBaseDescription" type="textarea"></el-input>
                </el-col>
            </el-row>
            <span v-if="errorModal">{{ systemLanguage.steps.incomplet }}</span>
            <span v-if="errorModalRepeat">{{ systemLanguage.steps.repeat }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="actionStep('cancel')">{{ systemLanguage.steps.cancel }}</el-button>
                <el-button type="primary" @click="actionStep('store')">{{ systemLanguage.steps.confirm }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tableSpecial from './tableSpecial'
import common from './commonMixins'

export default {
  name: 'steps',
  mixins: [common],
  mounted: function () {
    this.initSteps(this.getCurrentProject)
  },
  data () {
    return {
      stepBasetitle: '',
      stepBaseName: '',
      stepBaseDescription: '',
      stepBaseParent: '',
      stepModalCreate: false,
      errorModal: false,
      errorModalRepeat: false
    }
  },
  methods: {
    ...mapActions(['initSteps', 'addStep', 'removeStep']),
    selectStep (name) {
      let me = this
      this.removeStep({
        name: name,
        currentProject: me.getCurrentProject
      })
    },
    actionStep (action) {
      let me = this
      this.errorModalRepeat = false
      this.errorModal = false
      switch (action) {
        case 'create':
          this.stepBasetitle = ''
          this.stepBaseName = ''
          this.stepBaseDescription = ''
          this.stepBaseParent = ''
          this.stepModalCreate = true
          break
        case 'store':
          if (this.stepBasetitle === '' || this.stepBaseName === '' || this.stepBaseDescription === '') {
            this.errorModal = true
            return
          }
          let foundRepeat = this.listSteps.find(function (element) {
            return element.name.toUpperCase() === me.stepBaseName.toUpperCase()
          })
          if (foundRepeat) {
            this.errorModalRepeat = true
            return
          }
          let elementStep = {
            title: this.stepBasetitle,
            name: this.stepBaseName,
            description: this.stepBaseDescription
          }
          this.addStep({
            element: elementStep,
            currentProject: me.getCurrentProject
          })
          this.stepModalCreate = false
          break
        case 'cancel':
          this.stepBasetitle = ''
          this.stepBaseName = ''
          this.stepBaseDescription = ''
          this.stepBaseParent = ''
          this.stepModalCreate = false
          break
      }
    }
  },
  computed: {
    ...mapState(['steps']),
    listSteps () {
      return this.steps.listSteps
    }
  },
  components: {
    tableSpecial
  }
}
</script>
