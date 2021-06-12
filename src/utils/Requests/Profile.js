import Axios from 'axios'
import { api } from '../api'
import { toast } from 'react-toastify'
import { errorHandeller } from './Error'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({ autoClose: 2000 })

// My profile
const Me = async (header) => {
    try {
        const response = await Axios.get(`${api}profile`, header)
        if (response.status === 200) {
            return response.data.result
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}

// Update profile
const Update = async (data, header) => {
    try {
        const response = await Axios.put(`${api}profile`, data, header)
        if (response.status === 201) {
            toast.success(response.data.message)
            return true
        }
    } catch (error) {
        if (error) return errorHandeller(error)
    }
}


const Profile = {
    Me,
    Update
}

export default Profile