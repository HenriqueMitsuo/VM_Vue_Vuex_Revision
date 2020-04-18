<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
    <p>{{ getEventById(1) }}</p>
    <ul>
      <li v-for="(categorie, index) in categories" :key="index">
        {{ categorie }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['catLength', 'getEventById']),
    //? Shorthand e Spread para poder usar Computed State e Computed Local
    ...mapState(['user', 'categories'])
  }
  //? Formas de nomear os states
  //* computed: mapState({
  //*   userName: state => state.user.name,
  //*   userId: state => state.user.id,
  //!   ---------------------------------
  //*   user: 'user',
  //*   categories: 'categories'
  //* })
}
</script>

<style></style>
