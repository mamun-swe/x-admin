import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })


// List of Customers
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}customer?page=${page}&limit=${limit}`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Show specific customer
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}customer/${id}`, header)
        if (response.status === 200) {
            return response.data.customer
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store customer
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}customer`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific customer
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}customer/${id}`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Search customer
const Search = async (data, header) => {
    try {
        const response = await Axios.post(`${api}customer/search`, data, header)
        if (response.status === 200) {
            return response.data.results
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Customer = {
    Index,
    Show,
    Store,
    Update,
    Search
}

export default Customer