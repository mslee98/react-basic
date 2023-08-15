const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        text: 'hello, webpack'
    }

    render() {
        return <h1>{this.state.text}</h1>
    }
}

//이렇게 module에 추가하면 다른 파일에서 불러올 수 있음
//그냥 export default랑 똑같음
module.exports = WordRelay;