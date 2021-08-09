import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const firebaseConfig = {
    apiKey: "AIzaSyAI0gun7UoDXitDhjkaQIM7R5BjJQyEywY",
    authDomain: "computer-repair-337fe.firebaseapp.com",
    databaseURL: "https://computer-repair-337fe-default-rtdb.firebaseio.com",
    projectId: "computer-repair-337fe",
    storageBucket: "computer-repair-337fe.appspot.com",
    messagingSenderId: "918734575909",
    appId: "1:918734575909:web:00aa4c59c3d70f3abc22cc"
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const networksCollection = db.collection('networks')

export const createNetwork = network => {
    return networksCollection.add(network)
}

export const getNetwork = async id => {
    const network = await networksCollection.doc(id).get()
    return network.exists ? network.data() : null
}

export const updateNetwork = (id, network) => {
    return networksCollection.doc(id).update(network)
}

export const deleteNetwork = id => {
    return networksCollection.doc(id).delete()
}

export const useLoadNetworks = () => {
    const networks = ref([])
    const close = networksCollection.onSnapshot(snapshot => {
        networks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return networks
}

export default firebaseApp