<template>
    <div>
        <el-tag class="mb10">{{getCurrentProject}}</el-tag>
        <h3>{{systemLanguage.structure.title}} </h3>
        <el-button size="medium" type="primary" @click="addNode">{{systemLanguage.structure.new}}</el-button>
        <div style="min-height: 10px"></div>
        <el-tree :data="listStructure"
                 ref="central"
                 node-key="id"
                 default-expand-all
                 :expand-on-click-node="false"
                 :render-content="renderContent"></el-tree>
        <el-dialog
                :title="titleDialog"
                :visible.sync="structureDialog"
                width="90%">
            <span v-if="parentSelected">{{systemLanguage.structure.modalTitleStep}}</span>
            <span v-else>{{systemLanguage.structure.modalMessageStep}}</span>
            <table-special :list="listSteps" @select="appendStep"></table-special>
            <div v-if="parentSelected">
                <span>{{systemLanguage.structure.modalTitleFinish}}</span>
                <table-special :list="listFinishs" @select="appendFinish"></table-special>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="structureDialog = false">{{systemLanguage.structure.cancel}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/jsx">
  import tableSpecial from './tableSpecial'
  import {mapActions, mapGetters} from 'vuex'
  import languageSystem from '../language/en/messages'

  export default {
    name: 'structure',
    data () {
      return {
        structureDialog: false,
        parentSelected: null,
        typeSelected: ''
      }
    },
    mounted: function () {
      this.initFinishs(this.getCurrentProject)
      this.initSteps(this.getCurrentProject)
      this.initStructure(this.getCurrentProject)
    },
    methods: {
      ...mapActions(['updateListStructure', 'initStructure', 'initSteps', 'initFinishs']),
      handleNodeClick (data) {
        this.parentSelected = data
        this.structureDialog = true
      },
      appendStep (data) {
        this.typeSelected = 'step'
        this.append(data)
      },
      appendFinish (data) {
        this.typeSelected = 'finish'
        this.append(data)
      },
      append (data) {
        let id = this.maxId + 1
        const newChild = {id: id, type: this.typeSelected, label: data, children: []}
        let list = this.listStructure
        if (this.parentSelected === null) {
          list.push(newChild)
          this.updateListStructure({
            list: list,
            currentProject: this.getCurrentProject
          })
        } else {
          if (!this.parentSelected.children) {
            this.$set(this.parentSelected, 'children', [])
          }
          this.parentSelected.children.push(newChild)
          this.updateListStructure({
            list: this.listStructure,
            currentProject: this.getCurrentProject
          })
        }
        this.structureDialog = false
      },
      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.updateListStructure({
          list: this.listStructure,
          currentProject: this.getCurrentProject
        })
      },
      addNode () {
        this.parentSelected = null
        this.structureDialog = true
      },
      renderContent (h, {node, data, store}) {
        if (data.type === 'step') {
          return (
            <span
              style="flex: 1;display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
          </span>
          <span>
          <el-button style="font-size: 12px;" type="text" on-click={() => this.handleNodeClick(data)}>{this.systemLanguage.structure.append}</el-button>
          <el-button style="font-size: 12px;" type="text" on-click={() => this.remove(node, data)}>{this.systemLanguage.structure.delete}</el-button>
          </span>
          </span>)
        }
        return (
          <span
            style="flex: 1;display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
          </span>
          <span>
          <el-button style="font-size: 12px;" type="text" on-click={() => this.remove(node, data)}>{this.systemLanguage.structure.delete}</el-button>
          </span>
          </span>)
      }
    },
    computed: {
      ...mapGetters(['listStructure', 'listFinishs', 'listSteps', 'maxId', 'getCurrentProject', 'getCurrentSystemMessage']),
      systemLanguage () {
        if (this.getCurrentSystemMessage.default) return this.getCurrentSystemMessage.default
        return languageSystem
      },
      titleDialog () {
        if (!this.parentSelected) return this.systemLanguage.structure.modalTitleUnique
        return this.systemLanguage.structure.modalTitleTwo
      }
    },
    components: {
      tableSpecial
    }
  }
</script>
