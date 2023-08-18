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
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                // plugins: ['@babel/plugin-syntax-jsx'],
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