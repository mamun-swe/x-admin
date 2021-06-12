
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({ autoClose: 2000 })
export const errorHandeller = error => {
    const errorResponse = error && error.response ? error.response.data : null

    if (errorResponse) {
        if (errorResponse.message === 'unauthorized request') {
            toast.error(errorResponse.message + ' Logging out...')

            setTimeout(() => {
                localStorage.clear()
                window.location.reload()
            }, 2000)
        } else if (errorResponse.message === 'Token expired') {
            toast.error(error.message + ' Logging out...')

            setTimeout(() => {
                localStorage.clear()
                window.location.reload()
            }, 2000)
        } else {
            return toast.error(errorResponse.message)
        }
    }
}
