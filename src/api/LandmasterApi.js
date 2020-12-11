import api from '.'

const fetchLandmasterOffices = async landmaster_id => {
    try {
        const { data } = await api.post('/landmaster/get_offices', { landmaster_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to retrieve your offices, try again later.' }
    }
}

const addOffice = async office => {
    try {
        const { data } = await api.post('/landmaster/add_office', { office })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to add office, try again later.' }
    }
}

const modifyOffice = async office => {
    try {
        const { data } = await api.post('/landmaster/modify_office', { office })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to modify office, try again later.' }
    }
}

const excludeOffice = async office_id => {
    try {
        const { data } = await api.post('/landmaster/exclude_office', { office_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to exclude office, try again later.' }
    }
}

const getTotalOnMonth = async landmaster_id => {
    try {
        const { data } = await api.post('/landmaster/get_month_value', { landmaster_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get total on month, try again later.' }
    }
}

const getAverageOnMonths = async landmaster_id => {
    try {
        const { data } = await api.post('/landmaster/get_total_value', { landmaster_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get months mean, try again later.' }
    }
}

const getTopScoreOffice = async landmaster_id => {
    try {
        const { data } = await api.post('/landmaster/top_score_office', { landmaster_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get top score office, try again later.' }
    }
}

const getTopRentsOffice = async landmaster_id => {
    try {
        const { data } = await api.post('/landmaster/top_rents_office', { landmaster_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get top rents office, try again later.' }
    }
}


const getTopValueOffice = async landmaster_id => {
    try {
        const { data } = await api.post('/landmaster/top_value_office', { landmaster_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get top rents office, try again later.' }
    }
}

const getMonthRents = async landmaster_id => {
    try {
        const { data } = await api.post('/landmaster/get_month_rents', { landmaster_id })
        return data
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Failed to get month rents, try again later.' }
    }
}

const LandmasterApi = {
    fetchLandmasterOffices,
    addOffice,
    modifyOffice,
    excludeOffice,
    getTotalOnMonth,
    getAverageOnMonths,
    getTopScoreOffice,
    getTopRentsOffice,
    getTopValueOffice,
    getMonthRents
}

export default LandmasterApi