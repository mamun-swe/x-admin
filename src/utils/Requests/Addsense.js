import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })


// List of Addsenses
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}addsense`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store 
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}addsense`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Delete
const Delete = async (id, header) => {
    try {
        const response = await Axios.delete(`${api}addsense/${id}`, header)
        if (response.status === 200) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Addsenses = {
    Index,
    Store,
    Delete
}

export default Addsenses