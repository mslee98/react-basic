import { useRef, useEffect } from 'react';

/** 
 * customHook 생성 - 아래는 사용방식으로 isRunning이 null이라면 interval이 멈추도
 * const [isRunning, setIsRunning] = useState(true)
 * useInterval( () => {
 *  
 * }, isRunning? 1000 : null);
 * */ 


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect( () => {
        savedCallback.current = callback;
    });

    useEffect( () => {
        function tick() {
            savedCallback.current()
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, delay);


    return savedCallback.current;
}

export default useInterval;