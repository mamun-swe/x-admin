import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// List of orders
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}order?page=${page}&limit=${limit}`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Show specific order
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}order/${id}`, header)
        if (response.status === 200) {
            return response.data.order
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store order
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}order`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific order status
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}order/${id}/${data}`, header)
        if (response.status === 201) {
            toast.success(response.data.message)
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Search an order
const Search = async (data, header) => {
    try {
        const response = await Axios.post(`${api}order/search`, data, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Filter order
const Filter = async (data, header) => {
    try {
        const response = await Axios.post(`${api}order/filter`, data, header)
        if (response.status === 200) {
            return response.data.results
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Order = {
    Index,
    Show,
    Store,
    Update,
    Search,
    Filter
}

export default Order