import React, {useCallback} from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';


//dispatch는 최상위인 TicTacToe에서 만들어진거기 떄문에 Td까지 물려줘야함
const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
    
    const onClickTd = useCallback( () => {
        console.log("rowIndex : ", rowIndex, "cellIndex : ",cellIndex)
        dispatch({type:CLICK_CELL, row: rowIndex, cell: cellIndex})//이거 동작하나? 자식 컴포넌트에서는 모든 변수를 공유하는건가? 아 ㅋㅋ 아님 export붙여서 import하는 식임
        dispatch({type:CHANGE_TURN })
    },[])
    
    return (
        <>
          <td onClick={onClickTd}>{cellData}</td>  
        </>
    )
}

export default Td;