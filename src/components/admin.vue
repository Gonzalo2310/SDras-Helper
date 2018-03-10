<template>
    <div>
        <el-container>
            <el-header>{{ systemLanguage.title }}
               <!-- <el-select v-model="selectLanguage" size="mini" class="select-language">
                    <el-option
                            v-for="(item, index) in getAvailableSystemLanguage"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select> -->
            </el-header>
            <el-row>
                <el-col :span="24">
                    <el-menu default-active="List"
                             class="el-menu-demo"
                             mode="horizontal"
                             :router="true"
                             background-color="#094b6c"
                             text-color="#f0f8ff"
                             active-text-color="#ffd04b">
                        <el-menu-item index="List">{{systemLanguage.menu.list}}</el-menu-item>
                        <el-menu-item index="Profile">{{systemLanguage.menu.profile}}</el-menu-item>
                        <el-menu-item index="Language">{{systemLanguage.menu.language}}</el-menu-item>
                        <el-menu-item index="Steps">{{systemLanguage.menu.steps}}</el-menu-item>
                        <el-menu-item index="Finishs">{{systemLanguage.menu.finishs}}</el-menu-item>
                        <el-menu-item index="Structure">{{systemLanguage.menu.structure}}</el-menu-item>
                        <el-menu-item index="Create">{{systemLanguage.menu.create}}</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-main>
                <el-row>
                    <el-col :span="24">
                        <transition appear name="fade" mode="out-in">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </transition>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<style scoped>
    .el-header,
    .el-footer {
        text-align: center;
        line-height: 60px;
        background-color: #2c3e50;
        color: #f0f8ff;
    }

    .el-main {
        background-color: #e0e7ee;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .input-label {
        display: inline-block;
        padding-top: 10px;
    }

    .button-container {
        text-align: center;
        padding: 20px;
    }
</style>
<script>
  import profile from './profile'
  import language from './language'
  import languageSystem from '../language/en/messages'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    mounted: function () {
      this.initSystemLanguage()
    },
    data () {
      return {
        selectLanguage: 'en'
      }
    },
    watch: {
      selectLanguage: function (value) {
        this.setCurrentSystemLanguage(value)
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentProject',
        'getAvailableSystemLanguage',
        'getCurrentSystemLanguage',
        'getCurrentSystemMessage'
      ]),
      systemLanguage () {
        if (this.getCurrentSystemMessage.default) return this.getCurrentSystemMessage.default
        return languageSystem
      }
    },
    methods: {
      ...mapActions(['initSystemLanguage', 'setCurrentSystemLanguage'])
    },
    components: {
      profile,
      language
    }
  }
</script>
