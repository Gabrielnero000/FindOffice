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

const LandmasterApi = {
    fetchLandmasterOffices,
    addOffice
}

export default LandmasterApi