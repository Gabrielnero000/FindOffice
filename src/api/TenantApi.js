import api from '.'

const fetchTenantOffices = async tenant_id => {
    try {
        const { data } = await api.post('/tenant/get_offices', { tenant_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to retrieve your offices, try again later.' }
    }
}

const TenantApi = {
    fetchTenantOffices
}

export default TenantApi