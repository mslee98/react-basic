import React, {PureComponent, memo} from 'react';

const Ball = memo( ({number}) => {
    let background;

    if(number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }

    return (
        <>
            <div className="ball" style={{background}}>{number}</div>
        </>
    )
});


// class 방식
// class Ball extends PureComponent {
//     render() {
//         const {number} = this.props; // 이것만 봐도 자식 component인거 알 수 있음 근데 이렇게 적으면 사실 가독성이 안좋은거 아닐까?

//         let background;

//         if(number <= 10) {
//             background = 'red';
//         } else if (number <= 20) {
//             background = 'orange';
//         } else if (number <= 30) {
//             background = 'yellow';
//         } else if (number <= 40) {
//             background = 'blue';
//         } else {
//             background = 'green';
//         }

//         return (
//             <>
//                 <div className="ball" style={{background}}>{number}</div>
//             </>
//         )
//     }
// }

export default Ball;