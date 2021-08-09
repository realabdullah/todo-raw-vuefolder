<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Edit Network</h3>
      <form @submit.prevent="update">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="form.networkName" placeholder="Network Name">
          <label for="floatingInput">Network Name</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" v-model="form.networkAddress" placeholder="Network Address">
          <label for="floatingInput">Network Address</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" id="floatingInput" v-model="form.hostNumber" placeholder="Host Number">
          <label for="floatingInput">Host Number</label>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control" id="floatingInput" v-model="form.subnetworkNumber" placeholder="Sub-Network Number">
          <label for="floatingInput">Sub-Network Number</label>
        </div>
        
        <div class="form-group mt-3">
          <button type="submit" class="btn btn-primary btn-block">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNetwork, updateNetwork } from '../dbcodes'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const networkId = computed(() => route.params.id)

    const form = reactive({
      networkName: '',
      networkAddress: '',
      hostNumber: '',
      subnetworkNumber: ''
    })
    onMounted(async () => {
      const network = await getNetwork(networkId.value)
      form.networkName = network.networkName,
      form.networkAddress = network.networkAddress,
      form.hostNumber = network.hostNumber,
      form.subnetworkNumber = network.subnetworkNumber
    })

    const update = async () => {
      await updateNetwork(networkId.value, { ...form })
      router.push('/network-list')
      form.networkName = '',
      form.networkAddress = '',
      form.hostNumber = '',
      form.subnetworkNumber = ''
    }

    return {
      form,
      update
    }
  }
}
</script>

<style>

</style>