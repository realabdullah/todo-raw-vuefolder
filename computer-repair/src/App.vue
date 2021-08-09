<template>
  <nav class="navbar navbar-dark bg-dark justify-content-between flex-row">
    <div class="container-fluid">
      <a class="navbar-brand float-left">Network Repair List</a>
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link class="nav-link me-3" to="/add-network" v-if="loggedIn">Add Network</router-link>
          <router-link class="nav-link me-3" to="/login" v-else>Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link  me-3" to="/network-list">View Networks</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <a class="nav-link me-3" @click="logOut">Log Out</a>
        </li>
      </ul>
    </div>
  </nav>
  
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import firebase from './dbcodes'

export default {
  setup() {
    const loggedIn = ref(true)

    const router = useRouter()
    const route = useRoute()

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          loggedIn.value = true
        } else if(route.path == '/update-network' || route.path == '/add-network') {
          loggedIn.value = false
          router.replace('/register')
        } else {
          loggedIn.value = false
          router.replace('/network-list')
        }
      })
    })

    const logOut = () => {
      firebase.auth().signOut()
      router.push('/network-list')
    }

    return {
      loggedIn,
      logOut
    }
  },
}
</script>

<style>
</style>
