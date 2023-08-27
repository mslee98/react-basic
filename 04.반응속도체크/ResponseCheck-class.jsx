import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: []
    }

    timeout;
    statrtime;
    endtime;

    onClickScreen = (e) => {
        const { state, message, result} = this.state;

        if( state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색되면 클릭'
            });
            this.timeout = setTimeout( () => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭'
                })
                this.starttime = new Date()
            }, Math.floor( (Math.random() * 1000) + 2000 ));

        } else if ( state === 'ready' ) {

            clearTimeout(this.timeout);

            this.setState({
                state: 'waiting',
                message: '너무 성급했음, 다시',
            })
        } else if ( state === 'now') {
            this.endtime = new Date();

            this.setState( (prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요',
                    result: [...prevState.result, this.endtime - this.starttime]
                }
            })
        }
    }

    onReset = () => {
        const {state, message, result} = this.state;

        this.setState({
            state: 'waiting',
            message: '클릭해서 시작하세요',
            result: []
        })
    }
    
    render() {
        return (
            <>
                <div
                    id="screen"
                    className={this.state.state}
                    onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                {this.state.result.length === 0 
                    ? null
                    :<> {/** 프래그먼트 여러개 써도 상관없었네? */}
                        <div>평균시간 {this.state.result.reduce((a,c) => a+c / this.state.result.length)}ms</div>
                        <button onClick={this.onReset}>리셋</button>
                     </>
                }
            </>
        )
    }
}

export default ResponseCheck;