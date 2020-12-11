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
        const { data } = await api.post('/tenant/get_rents', { tenant_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get your rents, try again later.' }
    }
}

const getOfficeOccupation = async (office_id, month) => {
    try {
        const { data } = await api.post('/tenant/get_office_occupation', { office_id, month })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get occupation days of that office, try again later.' }
    }
}

const rent = async (office_id, tenant_id, rent_days) => {
    try {
        const { data } = await api.post('/tenant/rent', { office_id, tenant_id, rent_days })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to rent office, try again later.' }
    }
}

const checkIn = async rent_id => {
    try {
        const { data } = await api.post('/tenant/check_in', { rent_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to check in, try again later.' }
    }
}

const checkOut = async rent_id => {
    try {
        const { data } = await api.post('/tenant/check_out', { rent_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to check out, try again later.' }
    }
}

const scoreRent = async (rent_id, score) => {
    try {
        const { data } = await api.post('/tenant/score_office', { rent_id, score })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to give score, try again later.' }
    }
}

const TenantApi = {
    fetchOffices,
    searchOffices,
    fetchRents,
    getOfficeOccupation,
    rent,
    checkIn,
    checkOut,
    scoreRent
}

export default TenantApi