import axios from 'axios'
import { exp } from 'react-native-reanimated'

const api = axios.create({
    baseURL: 'http://10.0.0.33:5804'
})

export const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
})

export default api