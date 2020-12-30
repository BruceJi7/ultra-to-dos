import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://todo-list-ee7f3-default-rtdb.firebaseio.com/'
})

export default instance