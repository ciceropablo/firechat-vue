<template>
  <div class="conversation-container">
    Conversation id: {{ id }}
    <hr>
    <Message
      v-for="(message, key) in conversation.messages"
      :message="message"
      :key="key"
    />
    <br>
    <input v-model="newMessageText" @keyup.enter="send" placeholder="Type something...">
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'ConversationContainer',

  data() {
    return {
      newMessageText: ''
    }
  },

  props: {
    conversation: {
      type: Object,
      required: true
    },

    id: {
      type: String,
      required: true
    }
  },

  components: {
    Message
  },

  created() {
    this.$store.state.db.collection('conversations')
      .doc(this.id).onSnapshot(convers => {
        let source = convers.metadata.hasPendingWrites ? 'Local' : 'Server'

        console.log(`Source: ${source}`)

        const conversData = convers.data()
        if (convers && conversData) {
          conversData.messages.forEach(message => {
            this.$store.commit('conversations/ADD_MESSAGE', {
              conversationId: this.id,
              message
            })
          })
        }
      })
  },

  methods: {
    send() {
      this.$store.dispatch('conversations/sendMessage', {
        text: this.newMessageText,
        created: Date.now(),
        conversationId: this.id,
        sender: this.$store.state.users.currentUser
      })
    }
  }
}
</script>

<style scoped>
.conversation-container {}
</style>
