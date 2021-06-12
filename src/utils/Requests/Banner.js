import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// Index of items
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}banner`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store item
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}banner`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Delete item
const Delete = async (id, header) => {
    try {
        const response = await Axios.delete(`${api}banner/${id}`, header)
        if (response.status === 200) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Banner = {
    Index,
    Store,
    Delete
}

export default Banner