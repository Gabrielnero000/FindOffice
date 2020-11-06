import { Users } from '../../utils/MockData'

const delay = ms => new Promise(res => setTimeout(res, ms));

const login = async (email, password) => {
    await delay(2000)

    for (i in Users) {

        if (Users[i].email == email) {
            if (Users[i].password != password)
                return { sucess: false, error: 'Wrong password' }
            else
                return { sucess: true, user: Users[i] }
        }
    }

    return { sucess: false, error: 'Email not found' }
}

const signUp = user => {
    for (i in Users) {
        if (Users[i].email == user.email)
            return { sucess: false, error: 'Email already exists' }
    }

    return { sucess: true, user }
}

const AuthApi = {login, signUp}

export default AuthApi