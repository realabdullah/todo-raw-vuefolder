<template>
  <form @submit.prevent="Login">
    <h1 class="mb-5">Login</h1>
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <input type="email" v-model="email" class="form-control">
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" v-model="password" class="form-control">
    </div>
    <button type="submit" class="btn btn-dark">Login</button>
</form>
</template>

<script>
import { ref } from 'vue'
import firebase from '../dbcodes'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const router = useRouter()
    
    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(user => {
          router.push('/network-list')
          console.log(user)
        })
        .catch(err => alert(err.message))
    }

    return {
      Login,
      email,
      password
    }
  }
}
</script>

<style>

</style>