const React = require('react');
const { Component, useState, useRef } = React;


const WordRelay = () => {
    const [word, setWord] = useState('테스트');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);


    const onSubmitForm = (e) => {
        e.preventDefault();

        if(word[word.length-1] === value[0]) {
            setWord(value);
            setResult('정답');
            setValue('')
            inputRef.current.focus();
        } else {
            setResult('틀림');
            setValue('');
            inputRef.current.focus();
        }

    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }


    return (
        <>
            <h3>{word}로 끝나는 말은?</h3>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type="text" value={value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    )
}



// class WordRelay extends Component {
//     inputRef;

//     state = {
//         word: '테스트',
//         value: '',
//         result: ''
//     }

//     onSubmitForm = (e) => {
//         e.preventDefault();

//         console.log("ssss",this.state.value)

//         if(this.state.word[this.state.word.length-1] === this.state.value[0]) {
//             this.setState({
//                 word : this.state.value,
//                 value : '',
//                 result : '정답',
//             })
//         } else {
//             this.setState({
//                 value : '',
//                 result : '틀림'
//             })
//         }

//         this.inputRef.focus();
//     }

//     onChangeInput = (e) => {
//         this.setState({value: e.target.value})
//     }


//     render() {
//         return (
//             <>
//                 <h3>{this.state.word}로 끝나는 말은?</h3>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input ref={(ref) => this.inputRef = ref } type="text" value={this.state.value} onChange={this.onChangeInput}/>
//                     <button>입력</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         )
//     }
// }

//이렇게 module에 추가하면 다른 파일에서 불러올 수 있음
//그냥 export default랑 똑같음
module.exports = WordRelay;