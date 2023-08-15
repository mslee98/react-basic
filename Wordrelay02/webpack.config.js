const path = require('path')

module.exports = {
   //webpack이름
   name: 'word-relay-setting',

   // 개발(development)/운영(production) 모드 선택
   mode: 'development', 

   // 빠르게한다?
   devtool: 'eval',

   // 확장자 관리
   resolve: {
       extensions: ['.js', '.jsx'],
   },

   // *입력*
   // index.html에서 <script src="./dist/app.js">로 파일 하나를 가져오려면 client.jsx부터 WordRelay.js 등을 합쳐야한다.
   // 이 때 entry는 파일들을 입력한다는 소리임 파일을 하나로 합쳐 app.js를 만드는것
   entry: {
       // app: [ './client.jsx', './WordRelay.jsx'],
       // 이미 client.jsx에서 WordRelay.jsx를 불러와서 굳이 안적어줘도 되는데 이것도 webpack이 알아서 없애주는것 같음..만능이네
       // 위에 resolve를 만들어주면 확장자도 안적어줘두됨
       app: ['./client.jsx']
   },

   module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
   },

   // *출력*
   // node에 path.join을 사용하여 현재폴더 + dist 내로 입력한 파일들을 app.js로 출력한다.
   output: {
       path: path.join(__dirname, 'dist'),
       filename: 'app.js'
   }
}