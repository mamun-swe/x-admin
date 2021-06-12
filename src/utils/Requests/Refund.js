import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// List of refund
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}refund?page=${page}&limit=${limit}`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Show specific refund
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}refund/${id}`, header)
        if (response.status === 200) {
            return response.data.result
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific refund status
const Update = async (id, status, header) => {
    try {
        const response = await Axios.put(`${api}refund/${id}`, { status }, header)
        if (response.status === 201) {
            toast.success(response.data.message)
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Search item
const Search = async (data, header) => {
    try {
        const response = await Axios.post(`${api}refund/search`, data, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Refund = {
    Index,
    Show,
    Update,
    Search
}

export default Refund