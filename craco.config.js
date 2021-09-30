// const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco')
const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
    style: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    webpack: {
        alias: {
            '@': resolveApp('src'),
        },
    },
}
