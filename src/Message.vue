<template>
  <div class="messages">
    <div :class="getPosition">
      {{ message.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',

  props: {
    message: {
      type: Object,
      required: true
    }
  },

  computed: {
    getPosition() {
      const sender = this.message.sender;
      const currentUser = this.$store.state.users.currentUser;
      return (sender === currentUser) ? 'my message' : 'message';
    }
  }
}
</script>

<style scoped>
.messages {
  border: 1px solid silver;
}

.my.message {
  text-align: right;
}
</style>
