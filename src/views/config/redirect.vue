<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

      console.log(mapGetters)
      console.log(mapGetters)
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ]),
     doneTodosCount () {
            console.log(this.$store.state)
    }
  }
}
</script>

<style scoped>
.dashboard-container {
    margin: 30px;
  }
  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
  }

</style>
