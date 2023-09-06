import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';


function getWinNumbers() {
    const candidate = Array(45).fill().map( (v,i) => i+1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1]
    const winNumbers = shuffle.splice(0,6).sort( (p,c) => p - c);
    
    return [...winNumbers, bonusNumber];
}


//Hooks에 특성 상 Lotto 컴포넌트를 계속 리랜더링하면서 getWinNumbers()가 계속 재 실행됨
//그래서 useMemo를 사용해 getWinNumbers()초기값을 기억할 수 있음
// 쉽게 useRef => 일반 값을 기억 / useMemo => 복잡한 함수 결과값을 기억한다고 생각하면 좋을 듯!

const Lotto = () => {

    const lottoNumbers = useMemo( () => getWinNumbers(), [])// 2번쨰 인자가 바뀌지 않는 한 다시 실행되지 않음!

    // const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinballs] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);


    const runTimeouts = () => {
        for(let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout( () => {
                setWinballs( (prevBalls) => [...prevBalls, winNumbers[i] ])
            }, (i+1) * 1000)
        }

        timeouts.current[6] = setTimeout( () => {
            setBonus(winNumbers[6]);
            setRedo(true)
        }, 7000)
    };

    useEffect(() => { //componentDidMount, componentDidUpdate 역할 - 즉 초기실행으로 timeout해줘야겠지?
        runTimeouts();
        return () => {//이 return 부분은 componentWillUnmount 부분임
            timeouts.current.forEach( (v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]); // 2번쨰 인자를 빈 배열로 할 경우 componentDidMount와 같음 - 즉 초기실행 용도임

    // useEffect(() => {
    //     runTimeouts();
    // }, [winNumbers]); // 2번쨰 인자에 winNumbers를 넣을 경우 winNumbers State가 변경될 때 마다 작동하니 componentDidUpdate와 같음, 즉 다시 재실행임
                      // 그럴줄 알았는데 2개씩 실행되네? 즉 2번쨰 인자 배열의 요소가 있을 경우 componentDidMount와 componentDidUpdate를 둘 다 수행함! 
                      // 그리고 winNumbers가 변경되는것보다 구체적으로 이전 클래스의 경우 winNUmbers.length === 0일때 라고 했는데 배열의 조건문을 적어도 작동했음.

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers);
        setWinballs([]);
        setBonus(null);
        setRedo(false);

        timeouts.current = [];
    }, [winNumbers])


    return(
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map( (v) => <Ball key = {v} number = {v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number = {bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더</button>}
        </>
    )
}

export default Lotto;