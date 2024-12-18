import { useRef, useState } from "react"
import ResultModal from "./ResultModal.jsx";
// let timer;
export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();
    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStarted, setTimerStarted] = useState(false);
    const [timeRemaining, setTimerRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }
    function handleStart() {
        // setTimerStarted(true);
        timer.current = setInterval(() => {
            setTimerRemaining((prevTimeRemaining) => prevTimeRemaining - 10)
        }, 10);
        // timer.current = setTimeout(() => {
        //     setTimerExpired(true);
        //     dialog.current.open();
        // }, targetTime * 1000)
    }
    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current)
        // clearTimeout(timer.current)
    }
    function handleReset() {
        setTimerRemaining(targetTime * 1000);
    }
    return (
        <>
            <ResultModal onReset={handleReset} ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}