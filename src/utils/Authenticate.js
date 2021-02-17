// import jwt_decode from "jwt-decode"

export const checkIfLoggedIn = async () => {
    try {
        const token = localStorage.getItem("token")
        if (token) {
            // const user = jwt_decode(token)
            // if (user.role && user.role === 'admin') {
            //     return ({ role: user.role })
            // }
            // return false

            return true
        }

    } catch (error) {
        if (error) {
            return false
        }
    }
};