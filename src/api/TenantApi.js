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

const addOffice = async office => {
    try {
        const { data } = await api.post('/tenant/add_office', { office })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to add office, try again later.' }
    }
}

const TenantApi = {
    fetchTenantOffices,
    addOffice
}

export default TenantApi