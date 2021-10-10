import { baseRequest } from './init'

const permissionApi = {
    login: () => baseRequest.post('/login'),

    logout: () => baseRequest.post('/logout'),

    userInfo: () => baseRequest.get('/userInfo'),

    failRes: () => baseRequest.post('/fail', {}, { headers: { 'response-status': 401 } }),
}

export { permissionApi }
