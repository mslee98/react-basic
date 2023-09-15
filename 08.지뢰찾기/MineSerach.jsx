import React, { createContext, useReducer, useContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened가 되게
};

export const TableContext = createContext({
    tableData: [
        [-1, -1, -1, -1, -1, -1, -1],
        [-7, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -7, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
    ], //초기값 선언
    dispatch: () => {}, //초기값 선언
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell,mine);
    const candidate = Array(row * cell).fill().map( (arr,i) => {
        return i;
    });
    
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i =0; i < row; i++) {
        const rowData = []
        data.push(rowData);
        for(let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;

        data[ver][hor] = CODE.MINE;
    }

    return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME :
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            }
        case OPEN_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;

            return {
                ...state,
                tableData,
            }
        }
        case CLICK_MINE:
        // case CLICKED_MINE: {
        //     const tableData = [...state.tableData];
        //     tableData[action.row] = [...state.tableData[action.row]];
        //     tableData[action.row][action.cell] = CODE.OPENED;

        //     return {
        //         ...state,
        //         tableData,
        //     }
        // }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const value = useContext(TableContext)
    const value = useMemo( () => { tableData: state.tableData, dispatch} , [state.tableData]);

    return (
        <>
            {/* <TableContext.Provider value={{ tableData: state.tableData, dispatch}}> 이렇게 적으면 MineSearch가 리랜더링되면 배먼 새로운 객체를 생성하며 이것은 즉, 자식컴포넌트들도 모두 리랜더링이 되기 떄문에 성능정으로 매우 안좋음 그래서 캐싱?해야한다고 함*/}
            <TableContext.Provider value={{ tableData: state.tableData, dispatch}}>
                <Form dispatch={dispatch} />
                <div>{state.timer}</div>
                <Table />
                <div>{state.result}</div>
            </TableContext.Provider>
        </>
    )
};

export default MineSearch;
