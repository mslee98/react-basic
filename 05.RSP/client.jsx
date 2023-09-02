import React from 'react';
import ReactDOM from 'react-dom';//이렇게 적어도 문제는 없긴하데 'react-dom/client'로 적나봄?

// import RSP from './RSP-class';
import RSP from './RSP-functional';

// ReactDOM.render( <RSP />, document.querySelector("#root")); //이거 17버전 코드이긴함
ReactDOM.createRoot(document.querySelector("#root")).render(<RSP/>)