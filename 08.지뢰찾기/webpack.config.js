const path = require('path');
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");


module.exports = {
    name: 'tictactoe-setting',
    mode: 'development',
    devtool: 'eval',

    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client']
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
                plugins: ['react-refresh/babel']
            }
        }]
    },

    plugins: [
        new RefreshWebpackPlugin()
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },

    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname)},
        hot: true
    }
}