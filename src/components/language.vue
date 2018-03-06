<template>
    <div>
        <div>
            <blockquote>
                                <span>
                                    {{systemLanguage.language.message}}
                                </span>
            </blockquote>
        </div>
        <div class="grid-options-language">
            <div v-for="(language, index) in listLanguage" :key="index">
                <el-checkbox v-model="language.selected">{{language.name}}</el-checkbox>
            </div>
        </div>
        <div class="button-container">
            <el-button type="primary" size="medium" @click="selectAll">{{ titleSelect }}</el-button>
            <el-button type="success" size="medium" @click="actionModal('open')">{{systemLanguage.language.create}}
            </el-button>
            <el-button type="danger" size="medium" :disabled="noneClick" @click="destroyLanguage">
                {{systemLanguage.language.destroy}}
            </el-button>
        </div>
        <el-dialog
                title="Create Lenguaje"
                :visible.sync="newLanguageVisible">
            <span>{{systemLanguage.language.titleCreate}}</span>
            <span class="danger" v-if="errorModal">{{systemLanguage.language.errorCreate}}</span>
            <el-row class="column">
                <el-col :span="6">
                    <span>{{systemLanguage.language.name}}</span>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="basicLanguageTitle"></el-input>
                </el-col>
            </el-row>
            <el-row class="column">
                <el-col :span="6">
                    <span>{{systemLanguage.language.letter}}</span>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="basicLanguageShort" @keyup.native="basicLanguageShortLimit"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="actionModal('cancel')">{{systemLanguage.language.cancel}}</el-button>
                <el-button type="primary"
                           @click="actionModal('confirm')">{{systemLanguage.language.confirm}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import languageSystem from '../language/en/messages'

  export default {
    name: 'language',
    mounted: function () {
      this.initLanguage(this.getCurrentProject)
    },
    data () {
      return {
        newLanguageVisible: false,
        basicLanguageTitle: '',
        basicLanguageShort: '',
        errorModal: false
      }
    },
    methods: {
      ...mapActions(['addLanguage', 'removeLanguage', 'initLanguage', 'changeStateLanguage']),
      basicLanguageShortLimit () {
        this.basicLanguageShort = this.basicLanguageShort.substr(0, 2)
      },
      actionModal (action) {
        let me = this
        switch (action) {
          case 'confirm':
            if (this.basicLanguageTitle.trim() === '' || this.basicLanguageShort.trim() === '') {
              this.errorModal = true
              return
            }
            let element = {
              selected: false,
              name: this.basicLanguageTitle,
              short: this.basicLanguageShort
            }
            this.addLanguage({
              element: element,
              currentProject: me.getCurrentProject
            })
            this.newLanguageVisible = false
            break
          case 'open':
            this.basicLanguageTitle = ''
            this.basicLanguageShort = ''
            this.newLanguageVisible = true
            break
          case 'cancel':
            this.basicLanguageTitle = ''
            this.basicLanguageShort = ''
            this.newLanguageVisible = false
            break
        }
      },
      destroyLanguage () {
        this.removeLanguage(this.getCurrentProject)
      },
      selectAll () {
        let me = this
        let state = !(me.allClick)
        this.changeStateLanguage(state)
      }
    },
    computed: {
      ...mapGetters(['listLanguage', 'getCurrentProject', 'getCurrentSystemMessage']),
      systemLanguage () {
        if (this.getCurrentSystemMessage.default) return this.getCurrentSystemMessage.default
        return languageSystem
      },
      titleSelect () {
        if (this.allClick) return this.systemLanguage.language.unselect
        return this.systemLanguage.language.select
      },
      allClick () {
        let result = true
        this.listLanguage.forEach(function (element) {
          if (!element.selected) result = false
        })
        return result
      },
      noneClick () {
        let result = true
        this.listLanguage.forEach(function (element) {
          if (element.selected) result = false
        })
        return result
      }
    }
  }
</script>

<style scoped>
    .input-label {
        display: inline-block;
        padding-top: 10px;
    }

    .grid-options-language {
        padding-left: 15px;
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        grid-template-rows: auto;
    }

    blockquote {
        font: 16px/24px italic Times, serif;
        padding: 8px;
        background-color: #faebbc;
        border-top: 1px solid #e1cc89;
        border-bottom: 1px solid #e1cc89;
        margin-bottom: 25px;
        margin-top: -10px;
        background-image: url(https://css-tricks.com/examples/Blockquotes/images/openquote1.gif);
        background-position: top left;
        background-repeat: no-repeat;
        text-indent: 20px;
    }

    blockquote span {
        display: block;
        background-image: url(https://css-tricks.com/examples/Blockquotes/images/closequote1.gif);
        background-repeat: no-repeat;
        background-position: bottom right;
        font-size: 14px;
    }

    .button-container {
        text-align: center;
        padding: 20px;
    }

    .danger {
        font-size: 14px;
        color: #be6a6b;
    }

    .el-row.column {
        margin-top: 10px
    }

    @media (max-width: 600px) {
        .grid-options-language {
            padding-left: 15px;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: auto;
        }
    }
</style>
