import request from '@/utils/request'

const tableApi = {
    getTabList: () => request.get('/tabList'),

    getCardOne: () => request.get('/card/one'),

    getCardTwo: () => request.get('/card/two'),
}

export { tableApi }
