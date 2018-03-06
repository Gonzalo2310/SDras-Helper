<template>
    <div>
        <el-tabs tab-position="left" style="height: 100%;">
            <el-tab-pane label="Steps">
                <steps></steps>
            </el-tab-pane>
            <el-tab-pane label="Finishs">
                <finish></finish>
            </el-tab-pane>
            <el-tab-pane label="Structure">
                <structure></structure>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import steps from './steps'
  import finish from './finish'
  import structure from './structure'

  export default {
    name: 'options',
    components: {
      steps,
      finish,
      structure
    }
  }
</script>
