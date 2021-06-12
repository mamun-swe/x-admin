import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// List of admin
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}deactivated`, header)
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
        const response = await Axios.post(`${api}deactivated`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Delete
const Delete = async (id, type, header) => {
    try {
        const response = await Axios.delete(`${api}deactivated/${id}/${type}`, header)
        if (response.status === 200) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Admin = {
    Index,
    Store,
    Delete
}

export default Admin