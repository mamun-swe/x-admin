import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// List of coupons
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}coupon?page=${page}&limit=${limit}`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Store coupon
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}coupon`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Show specifi coupon
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}coupon/${id}`, header)
        if (response.status === 200) {
            return response.data.coupon
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update specific vendor
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}coupon/${id}`, data, header)
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
        const response = await Axios.delete(`${api}coupon/${id}`, header)
        if (response.status === 200) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Coupon = {
    Index,
    Store,
    Show,
    Update,
    Delete
}

export default Coupon