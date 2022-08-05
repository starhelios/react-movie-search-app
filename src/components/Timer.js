import React, {useEffect, useState} from "react";

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const pad = num => ("0" + num).slice(-2);

  const hours = Math.floor(time/60/60);
  const minutes = Math.floor((time - hours * 60 * 60) / 60);
  const seconds = Math.floor(time - hours * 60 * 60 - minutes * 60);

  return <span>{pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)}</span>;
}

export default Timer;
