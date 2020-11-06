import { Offices } from '../../utils/MockData'

export const getOffices = userId => Offices.filter(office => office.owner == userId)

export const addOffice = office => Offices.push(office)