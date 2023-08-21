const path = require('path');
const webpack = require('webpack');

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
            test: /\.jsx?$/, // 정규 표현식 보면 그래도 공부는 해봐야할 것 같음
            loader: 'babel-loader',
            options: {
                // presets도 상세 설정을 줄수 있음
                // presets: ['@babel/preset-env', '@babel/preset-react']
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            //이런식으로 적게되면 현재 크롬브라우저가 70이라고 하면 69, 70버전에 맞춰 호환할 수 있게 지원한다. browser 리스트 보면 다양한 사용방법들이 있으니 참고
                            // 아래 보면 한국에서 점유율이 5% 이상인 브라우저들과 크롬 최신 버전 2개를 뜻함
                            browsers: ['> 5% in KR', 'last 2 chrome versions'] 
                        },
                    }],
                    '@babel/preset-react',
                ],
                // plugins: ['@babel/plugin-syntax-jsx'],
            },
        }],
    },
    // plugins은 확장자 같은거 잖슴? module 에서만 사용하는게 아님
    // 
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}), // 이거는 말 그대로 로더 options에 debug모드를 추가하는 플러그인임
    ],

    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'app.js'
    },
}