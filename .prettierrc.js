const fabric = require('@umijs/fabric')

module.exports = {
    ...fabric.prettier,
    printWidth: 120, // 一行最多 120 字符
    tabWidth: 4, // 使用 4 个空格缩进
    useTabs: false, // 不使用缩进符，而使用空格
    semi: false, // 行尾需要有分号
    singleQuote: true, // 使用单引号
    arrowParens: 'avoid', // 箭头函数，只有一个参数的时候，不需要括号
}
