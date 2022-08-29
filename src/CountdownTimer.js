import { useState , useEffect} from "react";

export const CountdownTimer = () => {
  const [timerState, setTimerState] = useState('initial');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
      const timer = setInterval(() => {
        if (timerState === 'start' && totalTime >= 0) {
          setTotalTime(totalTime - 1);
          setHours(Math.floor(totalTime / 3600));
          let remainingMinutes = totalTime % 3600;
          setMinutes(Math.floor(remainingMinutes / 60));
          let remainingSeconds = remainingMinutes % 60;
          setSeconds(remainingSeconds);
        }
        else if (timerState === 'start' && totalTime < 0) {
          getNotification();
          setTimerState('initial');
          return;
        }}, 1000);
        return () => clearInterval(timer);
    }, [timerState, totalTime]);

  const renderTimer = () => {
    let hoursString = hours.toString();
    if (hours < 10) hoursString = "0" + hours;

    let minutesString = minutes.toString();
    if (minutes < 10) minutesString = "0" + minutes;

    let secondsString = seconds.toString();
    if (seconds < 10) secondsString = "0" + seconds;

    if (timerState === 'initial') {
      return (
        <div>
          <input type="number" placeholder="HH" onChange={handleHourInput}></input>:
          <input type="number" placeholder="MM" onChange={handleMinuteInput}></input>:
          <input type="number" placeholder="SS" onChange={handleSecondInput}></input>
        </div>
      )
    } else if (timerState === 'start' || timerState === 'pause' || timerState === 'done') {
      return (
        <div>
          {hoursString}:{minutesString}:{secondsString}
        </div>
      );
    }
  }

  const renderButtons = () => {
    if (timerState === 'start') {
      return (
        <div>
          <button onClick={handleClickPause}>Pause</button>
          <button onClick={handleClickReset}>Reset</button>
        </div>
      )
    } else if (timerState === 'initial') {
        return <button onClick={handleClickStart}>Start</button>
    } else if (timerState === 'pause') {
        return (
          <div>
            <button onClick={handleClickStart}>Start</button>
            <button onClick={handleClickReset}>Reset</button>
          </div>
        )
    }
  }

  const handleClickReset = () => {
    setTimerState('initial');
  }

  const handleClickPause = () => {
    setTimerState('pause');
  }

  const handleClickStart = () => {
    const totalSeconds = seconds + (minutes*60) + (hours*3600);
    setTotalTime(totalSeconds);
    setTimerState('start');
  }

  const handleHourInput = (e) => {
    setHours(parseInt(e.target.value));
  }

  const handleMinuteInput = (e) => {
    setMinutes(parseInt(e.target.value));
  }

  const handleSecondInput = (e) => {
    setSeconds(parseInt(e.target.value));
  }

  const getNotification = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Time is up");
      } else {
        alert("Time is up");
      }
    });
  }

  return (
    <div>
      {renderTimer()}
      {renderButtons()}
    </div>
  )
}
