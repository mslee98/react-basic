import React, { useCallback, useReducer, useEffect } from 'react';
import Table from './Table';


export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN  = 'CHANGE_TURN ';
export const RESET_GAME = 'RESET_GAME';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1,-1]
}

const reducer = (state, action) => {
    switch(action.type) {
        case SET_WINNER:
            return {
                ...state, //...스프레드 문법?이라고 하는데 옅은 복사를 하고 아래 바뀐 부분만 추가해주는거임 React state들은 불변성을 가져서 직접 바꾸면 X
                winner: action.winner
            };
        case CLICK_CELL: {
            //이 부분 헷갈렸음
            const tableData = [...state.tableData]//얕은 복사 후 펴줘야한다고 함
            tableData[action.row] = [...tableData[action.row]]; // 불변성 때문에 이런식으로 다 펼쳐야하는데 나중에는 immer라고 라이브러리 사용해서 가독성을 해결한다고 함
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
                tableData,
                recentCell : [action.row, action.cell]
            }
        };
        case CHANGE_TURN : {
            console.log("CHANGE_TURN?")
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME : {
            return {
                ...state,
                tableData:[['', '', ''], ['', '', ''], ['', '', '']]
            }
        }
        default :
            return state;
    }
}


const TicTacToe = () => {  
    
    // useReducer는 단어 자체만 봐도 스테이트 개수 자체를 줄이는 거임 - 마치 class에서 this.state에 여러 스테이트들을 담는것처
    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, turn, winner, recentCell } = state

    const onClickTable = useCallback( () => {
        
        //요약하자면 Table을 클릭하면 dispatch라는애가 action객체를 reducer에게 전달하며 상태가 변경될 때 마다 reducer함수에서 처리를 해줌

        //아래 dispatch는 useReducer에 dispatch를 가르키며 dispatch는 action객체를 가짐
        //보면 action은 변경 될 스테이트들을 의미하며 이거를 dispatch에 담아두고 이걸 변경을 해주는게 reducer함수임
        // dispatch({type:"SET_WINNER", winner: "O"})
        dispatch({type:SET_WINNER, winner: "O"}) // 약간 커뮤니티적 규칙 action의 타입은 대문자이며 상수로 빼두는게 규칙이라함ㅋㅋ
    },[])

    useEffect( () => {
        const [row, cell] = recentCell;
        let win = false;
        if(row < 0) {
            return;
        }
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true
        }

        if(win) {
            dispatch({type: SET_WINNER, winner: turn})
            // dispatch({type:CHANGE_TURN })
            dispatch({type:RESET_GAME })
        } else {
            //무승부검사
            let all = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if(!cell) {
                        all = false;
                    }
                })
            })

            if(all) {
                dispatch({type: SET_WINNER, winner: '무승부'})
                dispatch({type:RESET_GAME })
            } else {
                dispatch({type:CHANGE_TURN })
            }
        }
    }, [state.tableData])

    return(
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )

}

export default TicTacToe;