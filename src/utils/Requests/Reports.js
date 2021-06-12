import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

//Store credit report Index

const StoreCredit = async (header) => {
    try {
        const response = await Axios.get(`${api}report/store-credit`, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}
const Filter = async (data, header) => {
    try {
        const response = await Axios.post(`${api}report/store-credit/filter`, data, header)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

const Reports = {
    StoreCredit,
    Filter
}
export default Reports
