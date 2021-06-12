import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// Index of items
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}category`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Show specific item
const Show = async (id, type, header) => {
    try {
        const response = await Axios.get(`${api}category/${type}/${id}`, header)
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
        const response = await Axios.post(`${api}category`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific item
const Update = async (id, type, data, header) => {
    try {
        const response = await Axios.put(`${api}category/${type}/${id}`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update item image
const UpdateImage = async (id, type, data, header) => {
    try {
        const response = await Axios.put(`${api}category/image/${type}/${id}`, data, header)
        if (response.status === 201) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Category = {
    Index,
    Show,
    Store,
    Update,
    UpdateImage
}

export default Category