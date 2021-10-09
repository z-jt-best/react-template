import request from '@/utils/request'

const permissionApi = {
    login: () => request.post('/login'),

    logout: () => request.post('/logout'),

    userInfo: () => request.get('/userInfo'),

    failRes: () => request.post('/fail', {}, { headers: { 'response-status': 401 } }),
}

export { permissionApi }
