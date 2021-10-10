import { baseRequest } from './init'

const tableApi = {
    getTabList: () => baseRequest.get('/tabList'),

    getCardOne: () => baseRequest.get('/card/one'),

    getCardTwo: () => baseRequest.get('/card/two'),
}

export { tableApi }
