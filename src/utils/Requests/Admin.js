import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// List of admin
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}index`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Show specific admin
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}show/${id}`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store admin
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}create`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific admin
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}update/${id}`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Admin = {
    Index,
    Show,
    Store,
    Update
}

export default Admin