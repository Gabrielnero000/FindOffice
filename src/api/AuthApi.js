import api from '.'

const login = async (email, password) => {
    try {
        const { data } = await api.post('/auth/login', { email, password })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to login, try again later.' }
    }
}

const signUp = async user => {
    try {
        const { data } = await api.post('/auth/sign_up', { user })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to sign up, try again later.' }
    }
}

const AuthApi = {
    login,
    signUp
}

export default AuthApi