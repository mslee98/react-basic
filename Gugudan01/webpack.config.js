const path = require('path');

module.exports = {
    name: "gugudan-webpack-setting",
    mode: "development",
    devtool: "eval",

    resolve: {
        extensions: ['.js','.jsx']
    },

    entry: {
        app: ['./client']
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                // presets도 상세 설정을 줄수 있음
                // presets: ['@babel/preset-env', '@babel/preset-react']
                presets: [
                    ['@babel/preset-env', {
                        target: {
                            browsers: ['last 2 chrome versions'] //이런식으로 적게되면 현재 크롬브라우저가 70이라고 하면 69, 70버전에 맞춰 호환할 수 있게 지원한다. browser 리스트 보면 다양한 사용방법들이 있으니 참고
                        },
                    }],
                ],
                plugins: [],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
    ],

    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'app.js'
    },
}