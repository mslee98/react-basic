import React, { Component, memo } from 'react';

const Try = memo( ({tryInfo}) => {
    
    return (
        <>
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        </>
    )
});


// class Try extends Component {
    
//     render() {

//         console.log(this.props);

//         return(
//             <>
//                 <li>
//                     <div>{this.props.tryInfo.try}</div>
//                     <div>{this.props.tryInfo.result}</div>
//                 </li>
//             </>
//         )
//     }
// }
export default Try;