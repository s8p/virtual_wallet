import axios from 'axios'

const PORT = process.env.REACT_APP_APIPORT || 3000
const api = axios.create({
  baseURL: `http://localhost:${PORT}/api`,
})
export default api
