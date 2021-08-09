<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Add Network</h3>
      <form @submit.prevent="addNewData">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="network.networkName" placeholder="Network Name">
          <label for="floatingInput">Network Name</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="network.networkAddress" placeholder="Network Address">
          <label for="floatingInput">Network Address</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" id="floatingInput" v-model="network.hostNumber" placeholder="Host Number">
          <label for="floatingInput">Host Number</label>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control" id="floatingInput" v-model="network.subnetworkNumber" placeholder="Sub-Network Number">
          <label for="floatingInput">Sub-Network Number</label>
        </div>
        
        <div class="form-group mt-3">
          <button type="submit" class="btn btn-primary btn-block">Add Network</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createNetwork } from '../dbcodes'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

export default {
  setup() {
    const router = useRouter()

    const network = reactive({
      networkName: '',
      networkAddress: '',
      hostNumber: '',
      subnetworkNumber: ''
    })

    const addNewData = async () => {
      await createNetwork({ ...network })
      router.push('/network-list')
      network.networkName = '',
      network.networkAddress = '',
      network.hostNumber = '',
      network.subnetworkNumber = ''
    }

    return {
      network,
      addNewData
    }
  }
}
</script>
