import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// List of Ratings & Reviews
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}rating-review?page=${page}&limit=${limit}`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific review
const Update = async (id, status, header) => {
    try {
        const response = await Axios.post(`${api}rating-review/${id}`, { status }, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Delete specific review
const Delete = async (id, header) => {
    try {
        const response = await Axios.delete(`${api}rating-review/${id}`, header)
        if (response.status === 200) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const RatingReview = {
    Index,
    Update,
    Delete
}

export default RatingReview