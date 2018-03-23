<template>
    <div>
        <el-table
                :data="paginateList"
                @row-click="emitEvent"
                style="width:100%">
            <el-table-column v-for="title in titles" :key="title.index"
                             :label="title.label">
                <template slot-scope="scope">
                    {{limitSizeString(scope.row[title.prop], 50)}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  const _ = require('lodash')

  export default {
    name: 'tableSpecial',
    props: {
      list: {
        default: function () {
          return []
        },
        type: Array,
        required: true
      },
      listLabel: {
        type: Array,
        required: false,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        currentPosition: 0,
        currentSize: 10,
        currentTotal: 0
      }
    },
    methods: {
      emitEvent (row, event, column) {
        this.$emit('select', row.name)
      },
      limitSizeString (stringValue, stringSize) {
        return stringValue.length > stringSize ? stringValue.substring(0, stringSize) + '...' : stringValue
      }
    },
    computed: {
      interData () {
        return this.list || []
      },
      paginateList () {
        let result = _.chunk(this.interData, this.interData.length)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.currentTotal = result.length
        return result[this.currentPosition]
      },
      titles () {
        let answers = []
        let me = this
        let temporary = _.keys(this.interData[0])
        temporary.forEach(function (element, index) {
          answers.push({
            prop: element,
            label: me.listLabel[index] || element,
            index: index
          })
        })
        return answers
      }
    }
  }
</script>
