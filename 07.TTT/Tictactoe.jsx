import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''],['','',''],['','','']],
}

// 배열의 reduce 함수처럼 뭔가를 줄이는 역할이긴 함
const reducer = (state, action) => {
    
}

const Tictactoe = () => {

    const [state, dispatch] = useReducer(reducer, initialState) // 3번째 인자까지는 거의 안씀

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState(['','',''],['','',''],['','',''])
    
    const onClickTable = useCallback(() => {

    }, [])

    return (
        <>
            <Table onClick = {onClickTable}/>
            {/* {winner && <div>{} winner</div>} 기존에는 이런식으로 접근했다면 reducer의 경우 state로 만들어서 사용하기 떄문에*/}
            {state.winner && <div>{state.winner} winner</div>}
        </>
    )
}

export default Tictactoe;