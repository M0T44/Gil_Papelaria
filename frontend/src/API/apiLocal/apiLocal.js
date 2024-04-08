import axios from 'axios'

const apiLocal = axios.create({
    // baseURL: 'http://192.168.1.6:4444'
    baseURL: 'http://10.152.46.17:4444'
    // baseURL: 'http://localhost:4444'
    // baseURL: 'http://10.152.46.28:4444'
})

export default apiLocal