```js
import { makeAutoObservable, autorun, trace, runInAction } from 'mobx'

class Message {
    title
    author
    likes
    constructor(title, author, likes) {
        this.title = title
        this.author = author
        this.likes = likes
        makeAutoObservable(this) // 该方法必须放在所有初始化属性后面，不然无法监听属性的响应式
    }

    updateTitle(title) {
        this.title = title
    }

    changeName(value) {
        this.author.name = value
    }
}

let message = new Message('Foo', { name: 'Michel' }, ['Joe', 'Sara'])

// message.updateTitle('Bar')

// message = new Message('POP', { name: 'Michel' }, ['Joe', 'Sara']) // 这不会导致mobx发生变化，因为message只是一个变量

// /**
//  * message.title在外面被应用，并且引用的是一个String(原始类型)，并不是可观察的对象(要object、list、Map、Set才能被观察)
//  */
// let title = message.title
// autorun(() => {
//     console.log(title)
// })
// message.updateTitle('Bar')

// /**
//  * 这里message.author在外面被应用，但是message.author是一个object，并且是一个可观察的对象(因为被makeAutoObservervalble()递归过)
//  * author.name也被递归变成了可观察的属性，所以就算在外面被引用，在autorun()中应用时，Mobx也能检查到其变化
//  */
// let author = message.author
// autorun(() => {
//     console.log(author.name)
// })
// message.changeName('Bar')

// /**
//  * 可以在runInAction直接修改可观察对象的属性
//  * runInAction也算是一种action
//  */
// autorun(() => {
//     console.log(message.author.name)
// })
//
// runInAction(() => {
//     message.author.name = 'Sara'
// })
// runInAction(() => {
//     message.author = { name: 'Joe' }
// })

// /**
//  * 第一个改变将会被捕捉，message.author 和 author 是同一个对象，属性 .name 在 autorun 中被使用了，可以触发响应。
//  * 但是，第二个改变并不会被捕捉，因为 message.author 并没有被 autorun 跟踪，autorun 跟踪的是 author.name
//  * autorun 依然会继续使用之前定义的“老的” author。
//  */
// const author = message.author
// autorun(() => {
//     console.log(author.name)
// })

// runInAction(() => {
//     message.author.name = 'Sara'
// })
// runInAction(() => {
//     message.author = { name: 'Joe' }
// })

// /**
//  * 访问一个越界的index，message.likes发生变化后并不会Mobx并不会监听其变化
//  */
// autorun(() => {
//     console.log(message.likes[4])
// })
// message.likes.push('Jennifer')

// 这个可以监听到变化
// autorun(() => {
//     console.log(message.likes.join(', '))
// })
// message.likes.push('Jennifer')

// /**
//  * 访问一个本身不是可观察的属性，会出现两种情况
//  * 1. 在支持Proxy的环境下，Mobx会监听到响应，因为Proxy是拦截了整个对象的get/set方法
//  * 2. 在不支持Proxy的环境下，Mobx并不会监听到响应，因为使用的是Vue2的拦截对象方法，所以需要引入 import {get, set} from 'mobx'来手动完成这个动作
//  */
// autorun(() => {
//     console.log(message.author.age)
// })

// runInAction(() => {
//     message.author.age = 10
// })

// // 不支持Proxy的方式
// autorun(() => {
//     console.log(get(message.author, 'age'))
// })
// set(message.author, 'age', 10)
```
