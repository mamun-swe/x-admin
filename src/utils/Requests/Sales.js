import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })


// List of items
const FilterOptions = async (header) => {
    try {
        const response = await Axios.get(`${api}report/sales/filter/options`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


// Sales Report
const SalesReport = async (data, header) => {
    try {
        const response = await Axios.post(`http://localhost:4000/api/v1/admin/report/sales/filter/result`, data, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Buyer = {
    FilterOptions,
    SalesReport
}
export default Buyer