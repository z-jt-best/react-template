import { message } from 'antd'

//单例模式抽象，分离创建对象的函数和判断对象是否已经创建(第二版单例)
const createSingle = function (fn) {
    let result
    return function () {
        return result || (result = new fn(...arguments))
    }
}

// 提示框(单例模式)
class MessageModal {
    constructor() {
        this.show = false
    }

    showMessage(msg, closeFn) {
        if (this.show) {
            return
        }
        this.show = true

        message.error({
            content: msg || 'Error',
            duration: 2.5,
            onClose: () => {
                this.show = false
                closeFn && closeFn()
            },
        })
    }
}
const selfMessage = createSingle(MessageModal)
export const singleMessage = selfMessage()
