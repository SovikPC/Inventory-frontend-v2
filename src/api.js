import http from '@/http-common'

class api {
  getAllEquipment () {
    return http.get('/equipment')
  }

  getEquipment (id) {
    return http.get(`/equipment/${id}`)
  }

  createEquipment (data) {
    return http.post('/equipment', data)
  }

  updateEquipment (id, data) {
    return http.put(`/equipment/${id}`, data)
  }

  deleteEquipment (id) {
    return http.delete(`/equipment/${id}`)
  }

  getAllUser () {
    return http.get('/users')
  }

  getUser (id) {
    return http.get(`/users/${id}`)
  }

  createUser (data) {
    return http.post('/users', data)
  }

  updateUser (id, data) {
    return http.put(`/users/${id}`, data)
  }

  deleteUser (id) {
    return http.delete(`/users/${id}`)
  }

  getAllRoles () {
    return http.get('/roles')
  }

  getRoles (name) {
    return http.get(`/roles/${name}`)
  }

  getAllModel () {
    return http.get('/model')
  }

  getModel (name) {
    return http.get(`/model/${name}`)
  }

  getAllResponsible () {
    return http.get('/responsible')
  }

  getResponsible (fio) {
    return http.get(`/responsible/${fio}`)
  }

  getAllPosition () {
    return http.get('/position')
  }

  getPosition (name) {
    return http.get(`/position/${name}`)
  }

  getAllStatus () {
    return http.get('/status')
  }

  getStatus (name) {
    return http.get(`/status/${name}`)
  }

  createManufacturer (data) {
    return http.post('/manufacturer', data)
  }

  createPosition (data) {
    return http.post('/position', data)
  }

  createResponsible (data) {
    return http.post('/responsible', data)
  }

  createModel (data) {
    return http.post('/model', data)
  }

  getAllManufacturer () {
    return http.get('/manufacturer')
  }

  getManufacturer (name) {
    return http.get(`/manufacturer/${name}`)
  }

  getAllReports () {
    return http.get('/reports')
  }
}
// eslint-disable-next-line new-cap
export default new api()
