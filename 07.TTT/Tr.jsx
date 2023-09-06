import React from 'react';
import Td from './Td';

const Tr = ({rowIndex, rowData, dispatch}) => {

    return (
        <>
            <tr>{Array(rowData.length).fill().map( (td,i) => <Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>)}</tr>
            {/* <Td>{''}</Td> */}
        </>
    )
}

export default Tr;