import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
  all: {},
  allIds: [],
  allMsgIds: []
}

const mutations = {
  SET_CONVERSATION(state, { conversation }) {
    const data = conversation.data()
    state.all = {
      ...state.all,
      [conversation.id]: { users: data.users, created: data.created, messages: [] }
    }
    state.allIds.push(conversation.id)
  },

  ADD_MESSAGE(state, { conversationId, message }) {
    if (!state.allMsgIds.includes(message.id)) {
      state.all[conversationId].messages.push(message)
      state.allMsgIds.push(message.id)
    }
  }
}

const actions = {
  seed({ rootState }) {
    let convRef = rootState.db.collection('conversations')

    convRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_b'],
      messages: [
        { id: uuidv4(), text: 'Hi there!', sender: 'mr_a', created: Date.now() },
        { id: uuidv4(), text: 'Hi to you too!', sender: 'mr_b', created: Date.now() }
      ]
    })

    convRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_c'],
      messages: []
    })
  },

  async get({ commit, rootState }) {
    let convRef = rootState.db.collection('conversations')
    let convers = await convRef.get()
    convers.forEach(conversation => commit('SET_CONVERSATION', { conversation }))
  },

  sendMessage({ commit, rootState }, { text, created, sender, conversationId }) {
    const convRef = rootState.db.collection('conversations').doc(conversationId)
    convRef.update({
      messages: [...state.all[conversationId].messages, { id: uuidv4(), created, sender, text }]
    })
    .then(response => console.log('Message sent.'))
    .catch(error => console.log('Error', error))
  }
}

export default {
  namespaced: true, state, mutations, actions
}