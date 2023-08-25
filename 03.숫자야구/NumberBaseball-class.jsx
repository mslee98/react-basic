import React, { Component, createRef  } from 'react';
import Try from './Try';

function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

/**
 * Class 문법에서 주의해야할 점으로
 * onSubmitForm = () => {}; 이런식으로 작성하는 이유는 "this"때문임
 * onSubmitForm {}; 으로 작성하면 this가 NumberBaseball을 가르키지 않는다. 이럴 때는 this.onSubmitForm.bind(this)로 NumberBaseball을 가르키게 해야함
 * 
 * 그리고 만약 bind를 통해 진행해서 onSubmitForm() {} 이런식으로 진행할 때 this를 쓰려면 이 때는 constructor() 필요하며 constructor부분에서 this.xxxx로 초기화된 애들만 onSubmitForm에서 사용할 수 있음
 */

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        // const [result, tries, answer ] = this.state

        //모든 자리가 맞고 숫자가 일치할 때
        if(this.state.value === this.state.answer.join('')) {

            this.setState({
                result: 'Homerun',
                tries: [...this.state.tries, { try: this.state.value, result :'홉런'}]
            })
            alert('다시 실행'),
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: []
            });
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                this.setState({
                    result: `10번 시도 탈락${this.state.answer.join(',')}`
                });
                alert('다시 실행'),
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
            } else {
                for(let i = 0; i < 4; i += 1) {
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if ( this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {try: this.state.value, result :`${strike} 스트라이크, ${ball} 볼 입니다`}]
                })
            }
        }
    }

    onChangeInput = (e) => {
        this.setState({value: e.target.value});
    }

    inputRef = createRef();

    render() {
        return(
            <>
                <h3>숫자야구</h3>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력</button>
                </form>
                <div>{this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map( (v,i) => {
                        //index를 key로 쓰는건 좋지 않다고 함.. 이제까지는 다 인덱스를 키로 씀
                        return (
                            <Try key={`${i+1}차시도`} tryInfo={v}/>
                        )
                    })}
                </ul>
                
            </>
        )
    }
}

// module.exports = NumberBaseball;
export default NumberBaseball;