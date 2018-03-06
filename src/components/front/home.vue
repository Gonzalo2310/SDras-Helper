<template>
    <div>
        <h2>Home</h2>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <router-link :to="'/' + item.name">
                    {{item.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import ListTotal from '../../final/ProjectList'

  export default {
    name: 'home',
    mounted: function () {
      this.list = ListTotal.projects
    },
    data () {
      return {
        list: []
      }
    }
  }
</script>
