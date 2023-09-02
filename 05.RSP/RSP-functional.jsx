import React, { useState, useRef, useEffect } from 'react';
import useInterval from './useInterval';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImageCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  // const interval = useRef(null);
  const [isRunning, setIsRunning] = useState(true);

  
  const chanageHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImageCoord(rspCoords.가위)
    } else if (imgCoord === rspCoords.가위) {
      setImageCoord(rspCoords.보)
    } else {
      setImageCoord(rspCoords.바위)
    }
  }
  
  // useEffect( () => { // componentDidMount, componentDidUpdate 역할, 1:1 대응은 아님
  //   interval.current = setInterval(chanageHand, 100);
  //   return () => { // componentWillUnmount 역할
  //     clearInterval(interval.current) 
  //   }
  // }, [imgCoord])

  //커스텀 훅을 사용해서 위 코드를 아래처럼 변경 가능
  useInterval(chanageHand, isRunning? 100 : null);

  const onClickBtn = (choice) => () => {
    // clearInterval(interval.current);
    setIsRunning(false) //클릭했을때는 멈추도록

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비김')
    } else if ([-1, 2].includes(diff)) {

      setResult('이김');
      setScore( (prevState) => prevState + 1);

    } else {
      setResult('짐');
      setScore( (prevState) => prevState -1);
    }
    setTimeout(() => {
      // interval.current = setInterval(chanageHand, 100);
      setIsRunning(true)//1초 뒤에는 멈출 수 있도록
    }, 1000);
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
    </>
  )
}

export default RSP;