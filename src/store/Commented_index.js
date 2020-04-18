import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '../services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'John Doe' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: [],
    eventsTotal: '',
    event: {}
  },
  //? MUTATIONS - Funciona com um setter, sendo a forma principal de modificar o state
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  //? ACTIONS - Executa o processamento da informação e executa/commit por meio das mutations
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { page, perPage }) {
      EventService.getEvents(page, perPage)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
        })
        .catch(error => {
          console.log('There was an error', error.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error', error.response)
          })
      }
    }
  },
  //? GETTERS - São utilizados para requisitar informação do state de forma global(de qualquer parte do projeto)
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
    // getEventById = function getEventById(state) {
    //   return function (id) {
    //     return state.events.find(function (event) {
    //       return event.id === id;
    //     });
    //   };
    // };
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    }
  }
})
