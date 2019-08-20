import moment from 'moment'

export default class Helper {
  firstName(name) {
    let firstName = name.split(' ')
    return firstName[0]
  }

  // format from YYYY-MM-DD to DD/MM/YYYY
  dateFilter(dataReceived) {
    let dateParse = moment(dataReceived).format('DD/MM/YYYY')
    return dateParse
  }
}
