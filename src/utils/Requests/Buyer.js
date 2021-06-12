import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })


// List of items
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}report/buyer?page=${page}&limit=${limit}`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Filter item
const Filter = async (data, header) => {
    try {
        const response = await Axios.post(`${api}report/buyer/filter`, data, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Buyer = {
    Index,
    Filter
}
export default Buyer