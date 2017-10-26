<template>
  <div>
    <Initialize />
    <ConversationContainer
      v-for="(id, key) in conversIds"
      :conversation="conversations[id]"
      :id="id"
      :key="key"
    />
  </div>
</template>

<script>
import Initialize from './Initialize.vue'
import ConversationContainer from './ConversationContainer.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',

  components: {
    Initialize,
    ConversationContainer
  },

  computed: {
    ...mapState({
      conversations: state => state.conversations.all,
      conversIds: state => state.conversations.allIds
    })
  },

  created() {
    console.log('App#created', this.$store.state.db)
  }
}
</script>

<style scoped>
</style>
