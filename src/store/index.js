import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'

import users from './users'
import conversations from './conversations'

import config from '../config'

Vue.use(Vuex)
firebase.initializeApp(config)

const state = {
  db: firebase.firestore()
}

export default new Vuex.Store({
  state,
  modules: {
    users,
    conversations
  }
})