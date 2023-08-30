import React, { Component } from 'react';



// React 라이프사이클
// 클래스의 경우 => constructor => render => ref => componentDidMount
// (setState/props 바뀌는 경우) => shouldComponentUpdate(true) => render => componentDidUpdate
// 부모가 자식 컴포넌트를 제거할 때 => componentWillUnmout => 솔명

const rspCoords = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px'
}

const scores = {
    rock: 1,
    scissors: 0,
    paper: -1
}

class RSP extends Component {
    state = {
        imgCoord: rspCoords.rock,
        score: 0,
        result: '',
    }
    
    interval;

    changeHand = () => {
        const {imgCoord} = this.state;
        
        if (imgCoord == rspCoords.rock) {
            this.setState({
                imgCoord: rspCoords.scissors
            });
        } else if (imgCoord == rspCoords.scissors) {
            this.setState({
                imgCoord: rspCoords.paper
            });
        } else if (imgCoord == rspCoords.paper) {
            this.setState({
                imgCoord: rspCoords.rock
            });
        }
    }
        //진짜 초기 1회만 실행됨

    componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 이 부분에서 비동기 요청을 많이함
        //setInterval로 초기에 가위바위보를 1초 단위로 변경할 수 있게끔 걸어줌
        this.interval = setInterval(this.changeHand, 100);

    }

    componentDidUpdate() { // 리렌더링 후(props 변경, 데이터 변경 등)

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리(제거)를 하는 부분
        console.log("sss");
        clearInterval(this.interval);
    }

    onClickBtn = () => {

    }

    render() {

        const {imgCoord, result, score} = this.state;

        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}

export default RSP;