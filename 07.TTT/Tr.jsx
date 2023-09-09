import React, {memo, useMemo} from 'react';
import Td from './Td';

const Tr = memo(({rowIndex, rowData, dispatch}) => {

    return (
        <>
            <tr>
                {/* {Array(rowData.length).fill().map( (td,i) => 
                    useMemo ( () => {
                        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>    
                    }, [rowData[i]])// useMemo는 함수의 값 뿐만 아니라 컴포넌트도 기억할 수 있으며, rowData[i]즉 행안에 내용들이 바뀌지 않으면 수행되지 않음
                )} */}
                {Array(rowData.length).fill().map( (td,i) => 
                        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>    
                )}
            </tr>
            {/* <Td>{''}</Td> */}
        </>
    )
})

export default Tr;