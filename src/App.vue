<template>
  <div id="app">
    <transition name="fade">
      <Form v-if="formVisible" @closeForm="closeForm" />
    </transition>

    <div class="container">
      <div class="">
        <button @click="openForm" class="btn btn--transparent">Налоговый вычет</button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Form from "./components/Form";

export default {
  name: 'App',
  components: {
    Form
  },
  data() {
    return {
      formVisible: false
    }
  },
  methods: {
    ...mapActions(['clearHistory']),
    openForm() {
      this.formVisible = true;
    },
    closeForm() {
      this.clearHistory();
      this.formVisible = false;
    }
  }
}
</script>

<style scoped lang="scss">
</style>