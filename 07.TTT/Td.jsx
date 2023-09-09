import React, {memo, useCallback, useEffect, useRef} from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';


//dispatch는 최상위인 TicTacToe에서 만들어진거기 떄문에 Td까지 물려줘야함
const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    
    const ref = useRef([]);

    useEffect( () => {
        console.log(rowIndex === ref.current[0],cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3],)
        ref.current = [rowIndex, cellIndex, dispatch, cellData]
    }, [rowIndex, cellIndex, dispatch, cellData])

    const onClickTd = useCallback( () => {
        console.log("rowIndex : ", rowIndex, "cellIndex : ",cellIndex)

        if(cellData) {
            return;
        }
        dispatch({type:CLICK_CELL, row: rowIndex, cell: cellIndex})//이거 동작하나? 자식 컴포넌트에서는 모든 변수를 공유하는건가? 아 ㅋㅋ 아님 export붙여서 import하는 식임
        // dispatch({type:CHANGE_TURN })
    },[cellData])
    
    return (
        <>
          <td onClick={onClickTd}>{cellData}</td>  
        </>
    )
})

export default Td;