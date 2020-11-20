import api from '.'

const fetchOffices = async () => {
    try {
        const { data } = await api.get('/user/get_all_offices')
        return data
    } catch (error) {
        console.log(error)
        return {success: false, error: 'Failed to retrieve offices, try again later.'}
    }
}

const UserApi = {
    fetchOffices
}

export default UserApi