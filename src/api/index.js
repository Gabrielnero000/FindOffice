import axios from 'axios'

const api = axios.create({
    baseURL: 'http://10.0.0.33:5804'
})

export default api