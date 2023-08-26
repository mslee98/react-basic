import React, { useState, useRef } from 'react';
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

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputRef= useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(value === answer) {
            setResult('홈런');
            setTries([...tries, {try: value, result: '홈런'}])
            
            alert('다시 실행'),
            setValue('');
            setTries([]);
            setAnswer(getNumbers);
        } else {

            const answerArr = value.split('').map( (v) => parseInt(v));
            let strike = 0, ball =0;

            if(tries.length >= 9) {
                alert('10번 시도 탈락, 다시 실행')
                setValue('');
                setTries([]);
                setAnswer(getNumbers);
            } else {
                for(let i=0; i <4; i++) {
                    if(answerArr[i] === answer[i]) {
                        strike++;
                    } else if( answer.includes(answerArr[i])) {
                        ball++;
                    }
                }

                // 이 부분은 모순이 있음 setTries([...tries, {try: value, result: `${strike} 스트라이크 / ${ball} 볼 입니다`}]);
                //이전 값을 포함시켜서 진행해야하니 이렇게 진행해야함
                setTries((pervState) => {
                    return ([...pervState, {try: value, result: `${strike} 스트라이크 / ${ball} 볼 입니다`}])
                });
            }

        }

    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h3>숫자야구</h3>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>{tries.length}</div>
            <ul>
                {tries.map( (v,i) => {
                    //index를 key로 쓰는건 좋지 않다고 함.. 이제까지는 다 인덱스를 키로 씀
                    return (
                        <Try key={`${i+1}차시도`} tryInfo={v}/>
                    )
                })}
            </ul>
        </>
    )
};

export default NumberBaseball;
