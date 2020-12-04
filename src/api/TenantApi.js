import api from '.'

const fetchOffices = async () => {
    try {
        const { data } = await api.get('/tenant/get_all_offices')
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to retrieve offices, try again later.' }
    }
}

const searchOffices = async filter => {
    try {
        const { data } = await api.post('/tenant/search_offices', { filter })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to search offices, try again later.' }
    }
}

const fetchRents = async tenant_id => {
    try {
        const { data } = await api.post('/tenant/get_rents', { filter })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get your rents, try again later.' }
    }
}

const TenantApi = {
    fetchOffices,
    searchOffices,
    fetchRents
}

export default TenantApi