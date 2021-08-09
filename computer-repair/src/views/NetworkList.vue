<template>
  <div class="row">
    <div class="col-md-12">
      <h1 class="mb-5">Network List</h1>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Network Name</th>
            <th scope="col">Network Address</th>
            <th scope="col">Host Number</th>
            <th scope="col">Sub-Network Number</th>
            <th scope="col" v-if="loggedIn">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ id, networkName, networkAddress, hostNumber, subnetworkNumber } in networks" :key="id">
            <th scope="row">{{ networkName }}</th>
            <td>{{ networkAddress }}</td>
            <td>{{ hostNumber }}</td>
            <td>{{ subnetworkNumber }}</td>
            <td v-if="loggedIn">
              <router-link :to="`/update-network/${id}`">
                <button class="btn btn-primary btn-sm me-2">Edit</button>
              </router-link>
              <button @click.prevent="deleteNetwork(id)" class="btn btn-danger btn-sm ml-3">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useLoadNetworks, deleteNetwork } from '../dbcodes'
import firebase from '../dbcodes'
import { ref } from 'vue'

export default {
  setup() {
    const loggedIn = ref(true)

    const networks = useLoadNetworks()

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        loggedIn.value = true
      } /*else if(route.path == '/update-network' || route.path == '/register') {
        router.replace('/register')
      } */ else {
        loggedIn.value = false
      }
    })

    return {
      networks,
      deleteNetwork,
      loggedIn
    }
  }
}
</script>

<style>

</style>