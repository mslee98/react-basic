import React, { memo, useContext } from 'react';
import Td from './Td';
import { TableContext } from './MineSerach';


const Tr = memo(({rowIndex}) => {
    const { tableData } = useContext(TableContext)
    
    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map( (td, i) => <Td rowIndex={rowIndex} cellIndex={i} />)}
        </tr>
    )
});

export default Tr;
