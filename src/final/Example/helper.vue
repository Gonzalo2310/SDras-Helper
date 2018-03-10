<template>
    <div class="limit-width">
        <div class="row">
            <div class="column text-right">
                <select v-model="activeLanguage">
                    <option v-for="(item, index) in allLanguage" :key="index" :value="item.short">
                        {{item.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="one-half column">
                <div>
                    <h1>{{fullProfile.title}}</h1>
                    <div class="specialsub">{{fullProfile.summary}}</div>
                    <span>{{fullProfile.generalTitle}}</span>
                </div>
                <div>
                    <select v-model="selectStructure">
                        <option :key="0" :value="nullElement">
                            ...
                        </option>
                        <option v-for="item in rootStructure" :key="item.id" :value="item">
                            {{searchContent(item).title}}
                        </option>
                    </select>
                </div>
                <div v-for="(item, index) in selectArray" :key="item.id">
                    <div v-if="item.type==='step'">
                        <p>
                            <span v-if="index===0">{{searchContent(selectStructure).description}}</span>
                            <span v-else>{{searchContent(item).description}}</span>
                        </p>
                        <select v-model="itemArray[index]" @change="changeSelect(itemArray[index],index)">
                            <option :key="0" :value="nullElement">
                                ...
                            </option>
                            <option v-for="element in item.children" :key="element.id" :value="element">
                                {{searchContent(element).title}}
                            </option>
                        </select>
                    </div>
                    <div v-else style="margin-top:10px">
                        <h2>{{finishSelect.short}}</h2>
                        <p>{{finishSelect.description}}</p>
                        <p v-if="finishSelect.url"><a a target="_blank" :href="finishSelect.url">Link</a></p>
                    </div>
                </div>
            </div>
            <div class="one-half column" v-if="finishSelect">
                <h3>Usage</h3>
                <blockquote class="usage">
                            <span v-html="changeEndOfLine(finishSelect.example)">
                            </span>
                </blockquote>
                <h3>Output</h3>
                <blockquote class="usage">
                            <span v-html="finishSelect.output">
                            </span>
                </blockquote>
            </div>
        </div>
    </div>
</template>
<script>
  import importLanguage from './data/language'
  import importStructure from './data/structure'

  export default {
    name: 'helper',
    data () {
      return {
        activeLanguage: 'en',
        allLanguage: importLanguage.language,
        fullStructure: importStructure.structure,
        fullProfile: {},
        fullFinish: [],
        fullStep: [],
        rootStructure: [],
        nullElement: null,
        selectStructure: null,
        temporal: {},
        countExample: 0,
        intervalExample: null,
        selectArray: [],
        itemArray: [],
        finishSelect: null
      }
    },
    watch: {
      activeLanguage: function (val) {
        this.languageDependentData(val)
      },
      selectStructure: function (val) {
        this.addStructure()
      }
    },
    mounted: function () {
      this.languageDependentData(this.activeLanguage)
      this.languageRootStructure()
    },
    methods: {
      changeSelect (element, index) {
        this.selectArray.splice(index + 1)
        if (element) this.selectArray.push(element)
        else {
          this.finishSelect = null
          return
        }
        this.finishSelect = element.type === 'finish' ? this.searchContent(element) : null
      },
      addStructure () {
        this.selectArray = []
        if (this.selectStructure) {
          this.selectArray.push(this.selectStructure)
        }
      },
      languageDependentData (val) {
        let me = this
        import('./data/' + val + '/profile.json')
          .then(response => {
            me.fullProfile = response.profile
          })
          .catch(error => {
            console.log(error.data)
          })
        import('./data/' + val + '/steps.json')
          .then(response => {
            me.fullStep = response.steps
          })
          .catch(error => {
            console.log(error.data)
          })
        import('./data/' + val + '/finish.json')
          .then(response => {
            me.fullFinish = response.finish
          })
          .catch(error => {
            console.log(error.data)
          })
      },
      languageRootStructure () {
        let me = this
        this.fullStructure.forEach(function (element) {
          me.rootStructure.push(element)
        })
      },
      searchContent (item) {
        let listElement = (item.type === 'step') ? this.fullStep : this.fullFinish
        if (listElement.length === 0) return {title: '***'}
        return listElement.find(element => element.name === item.label)
      },
      changeEndOfLine (item) {
        return item.replace(/\n/g, '<br>')
      }
    }
  }
</script>
<style scoped>
    @import "./normalize.css";
    @import "./skeleton.css";

    .text-right {
        text-align: right;
    }

    .specialsub {
        color: #d86f5a;
        font-size: 19px;
        margin-bottom: 30px;
    }

    .limit-width {
        max-width: 900px;
        margin: auto;
    }

    .usage {
        border: 2px solid red;
        background-color: black;
        color: #aeded4;
        font-size: 20px;
        letter-spacing: 0.1em;
        padding: 10px;
    }

    h1 {
        font-size: 2em;
        margin-bottom: 0;
        letter-spacing: 0.01em;
    }
    h2 {
        font-size: 1.7em;
        letter-spacing: 0.01em;
    }
    h3 {
        font-size: 1.4em;
        letter-spacing: 0.01em;
    }
    p {
        margin: 10px 0 0 0;
    }
    select {
        margin-bottom: 10px;
    }

</style>
