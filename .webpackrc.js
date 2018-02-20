const path = require('path')
export default {
    define: {
        APPURL: process.env.NODE_ENV === 'development' ? 'http://test.api.youdustory.com' : 'https://api.youdustory.com'
    },
    browserslist: [
        "> 1%",
        "last 2 versions"
    ],
    alias: {
        Utis: path.resolve(__dirname, 'src/utils/'),
    },
    // html: {
    //     template: './src/index.ejs'
    // },
    // externals: {
    //     "react": "window.React",
    //     "react-dom": "window.ReactDOM"
    // }
}