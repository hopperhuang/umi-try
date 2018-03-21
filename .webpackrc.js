const path = require('path')
export default {
    define: {
        APPURL: process.env.NODE_ENV === 'development' ? 'http://test.api.youdustory.com' : 'https://api.youdustory.com',
        // APPURL: 'https://api.youdustory.com'
    },
    browserslist: [
        "> 1%",
        "last 2 versions"
    ],
    alias: {
        Utis: path.resolve(__dirname, 'src/utils/'),
        ModelUtils: path.resolve(__dirname, 'src/modelUtils/'),
        Components: path.resolve(__dirname, 'src/components/'),
    },
    publicPath: '/static/',
    env: {
        production: {
            externals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
                'react-router-dom': 'ReactRouterDOM'
            },
        }
    }
}