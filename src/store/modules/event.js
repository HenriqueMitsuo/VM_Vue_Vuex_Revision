import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: '',
  event: {}
}
export const mutations = {
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
}
export const actions = {
  //! Acessando State de outro modulo
  //! rootState = State base do store.js
  //   createEvent({ commit, rootState }, event) {
  //!    console.log('User State:' + rootState.user.user.name)
  //     return EventService.postEvent(event).then(() => {
  //       commit('ADD_EVENT', event)
  //     })
  //   }
  //! Acessando Actions de outro modulo
  //! rootState = State base do store.js
  //! Dispatch = Helper para acessar outras actions
  //! { root: true } = procura a action na base do store.js
  //   createEvent({ commit, dispatch, rootState }, event) {
  //!    console.log('User State:' + rootState.user.user.name)
  //!    dispatch('userAction') <- Sem Name Space
  //!    dispatch('user/userAction', <payload>, { root: true }) <- Com Name Space
  //     return EventService.postEvent(event).then(() => {
  //       commit('ADD_EVENT', event)
  //     })
  //   }
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
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  },
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
