import React, { Component } from 'react';
import Ball from './Ball';

// 추첨할 수를 미리 뽑도록
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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false //재실행을 위한 state임
    }

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;

        //let을 쓰면 클로저 문제가 덜 생김 
        for(let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout( () => {
                this.setState( (prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]]
                    }
                })
            }, (i+1) * 1000)
        }

        this.timeouts[6] = setTimeout( () => {
            this.setState({
                bonus: winNumbers[6],
                redo: true
            })
        }, 7000)
    }

    componentDidMount() {
        this.runTimeouts();
    }

    componentWillUnmount() {
        // for(let i = 0; i < this.timeouts.length; i++) {
        //     clearTimeout(this.timeouts)
        // }

        this.timeouts.forEach( (v) => {
            clearImmediate(v)
        });
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false //재실행을 위한 state임
        })

        this.timeouts = [];
    }

    componentDidUpdate(prevProps, prevState) {// 위에 onClickRedo를 통해 바뀐 state는 this.state에 있고 바뀌기 전에 state는 prevState에 있음
        if(this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    render() {
        const { winBalls, bonus, redo} = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map( (v) => <Ball key = {v} number = {v} />)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number = {bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번 더</button>}
            </>
        )
    }

}

export default Lotto;