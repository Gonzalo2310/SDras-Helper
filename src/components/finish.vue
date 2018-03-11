<template>
    <div>
        <el-tag class="mb10">{{getCurrentProject}}</el-tag>
        <h3>{{systemLanguage.finish.title }}</h3>
        <el-button type="success" size="medium" @click="actionFinish('create')">{{systemLanguage.finish.new}}</el-button>
        <div style="min-height: 10px"></div>
        <table-special
                @select="selectFinish"
                :list="listFinishs"
                :list-label="[
                systemLanguage.finish.table.title,
                systemLanguage.finish.table.name,
                systemLanguage.finish.table.description,
                systemLanguage.finish.table.short,
                systemLanguage.finish.table.example,
                systemLanguage.finish.table.output
                ]"
        ></table-special>
        <el-dialog
                title="Create the finish"
                :visible.sync="finishModalCreate">
            <span>{{systemLanguage.finish.required}}</span>
            <el-row class="mt10">
                <el-col :span="6">
                    <span>{{systemLanguage.finish.name}}</span>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="finishBaseName"></el-input>
                    <span>{{systemLanguage.finish.identify}}</span>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">
                    <span>{{systemLanguage.finish.modalTitle}}</span>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="finishBaseTitle"></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">
                    {{systemLanguage.finish.short}}
                </el-col>
                <el-col :span="18">
                    <el-input v-model="finishBaseShort"></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">{{systemLanguage.finish.description}}</el-col>
                <el-col :span="18">
                    <el-input v-model="finishBaseDescription" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">{{systemLanguage.finish.example}}</el-col>
                <el-col :span="18">
                    <el-input v-model="finishBaseExample" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">{{systemLanguage.finish.output}}</el-col>
                <el-col :span="18">
                    <el-input v-model="finishBaseOutput" type="textarea"></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="6">
                    <span>{{systemLanguage.finish.url}}</span>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="finishBaseUrl"></el-input>
                </el-col>
            </el-row>
            <span v-if="errorModal">{{systemLanguage.finish.incomplet}}</span>
            <span v-if="errorModalRepeat">{{systemLanguage.finish.repeat}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="actionFinish('cancel')">{{systemLanguage.finish.cancel}}</el-button>
                <el-button type="primary" @click="actionFinish('store')">{{systemLanguage.finish.confirm}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import tableSpecial from './tableSpecial'
  import {mapActions, mapGetters} from 'vuex'
  import languageSystem from '../language/en/messages'

  export default {
    name: 'finish',
    mounted: function () {
      this.initFinishs(this.getCurrentProject)
    },
    data () {
      return {
        finishBaseTitle: '',
        finishBaseName: '',
        finishBaseDescription: '',
        finishBaseShort: '',
        finishBaseExample: '',
        finishBaseOutput: '',
        finishBaseParent: '',
        finishBaseUrl: '',
        finishModalCreate: false,
        errorModal: false,
        errorModalRepeat: false
      }
    },
    methods: {
      ...mapActions(['initFinishs', 'addFinish', 'removeFinish']),
      selectFinish (name) {
        let me = this
        this.removeFinish({
          name: name,
          currentProject: me.getCurrentProject
        })
      },
      actionFinish (action) {
        let me = this
        this.errorModalRepeat = false
        this.errorModal = false
        switch (action) {
          case 'create':
            this.finishBaseTitle = ''
            this.finishBaseName = ''
            this.finishBaseDescription = ''
            this.finishBaseShort = ''
            this.finishBaseExample = ''
            this.finishBaseOutput = ''
            this.finishBaseParent = ''
            this.finishBaseUrl = ''
            this.finishModalCreate = true
            break
          case 'store':
            this.errorModal = false
            this.errorModalRepeat = false
            if (this.finishBaseTitle === '' || this.finishBaseName === '' || this.finishBaseDescription === '' || this.finishBaseShort === '' || this.finishBaseExample === '' || this.finishBaseOutput === '') {
              this.errorModal = true
              return
            }
            let foundRepeat = this.listFinishs.find(function (element) {
              return element.name.toUpperCase() === me.finishBaseName.toUpperCase()
            })
            if (foundRepeat) {
              this.errorModalRepeat = true
              return
            }
            let elementFinish = {
              title: this.finishBaseTitle,
              name: this.finishBaseName,
              description: this.finishBaseDescription,
              short: this.finishBaseShort,
              example: this.finishBaseExample,
              output: this.finishBaseOutput,
              url: this.finishBaseUrl
            }
            this.addFinish({
              element: elementFinish,
              currentProject: me.getCurrentProject
            })
            this.finishModalCreate = false
            break
          case 'cancel':
            this.finishBaseTitle = ''
            this.finishBaseName = ''
            this.finishBaseDescription = ''
            this.finishBaseShort = ''
            this.finishBaseExample = ''
            this.finishBaseOutput = ''
            this.finishBaseParent = ''
            this.finishBaseUrl = ''
            this.finishModalCreate = false
            break
        }
      }
    },
    computed: {
      ...mapGetters(['listFinishs', 'getCurrentProject', 'getCurrentSystemMessage']),
      systemLanguage () {
        if (this.getCurrentSystemMessage.default) return this.getCurrentSystemMessage.default
        return languageSystem
      }
    },
    components: {
      tableSpecial
    }
  }
</script>

<style scoped>
    .mt10 {
        margin-top: 10px;
    }
</style>
