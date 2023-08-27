import React, { useState, useRef } from 'react';

const ResponseCheck = () => {

    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭하셈');
    const [result, setResult] = useState([]);
    const startTime = useRef(null);
    const endTime = useRef(null);
    const timeOut = useRef(null);

    const onClickScreen = (e) => {

        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭');

            timeOut.current = setTimeout( () => {
                startTime.current = new Date();
                setState('now');
                setMessage('클릭하세요');
            }, Math.floor((Math.random() * 1000) + 2000))


        } else if (state === 'ready') {
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('성급함, 다시 하셈')

        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setResult((prevState) => {
                return ([...prevState, endTime.current - startTime.current])
            });
        }

    }

    return (
        <>
        <div
            id="screen"
            className={state}
            onClick={onClickScreen}
            >
            {message}
        </div>
        {result.length === 0 
        ? null
        : <div>{result.reduce((a,c) => a+c / result.length)}</div>}
        </>
    )

}

export default ResponseCheck;