import axios from 'axios'

const apiLocal = axios.create({
    baseURL: 'http://192.168.1.6:3334'
    // baseURL: 'http://10.152.46.17:3334'
})

export default apiLocal