import { useEffect, useState } from "react";

function calc(dateA: Date, dateB: Date) {
  return Math.floor(dateA.getTime() - dateB.getTime());
}

function nD() {
  const d = new Date();
  d.setDate(9);
  return d.getTime();
}

export function Timer() {
  // UNIX Timestamp (ms)
  const [deadline, setDeadline] = useState(nD());
  const [remaining, setRemaining] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const i = setInterval(() => {
      const countDown = deadline - new Date().getTime();

      // calculate time left
      const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

      setRemaining([days, hours, minutes, seconds]);
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <p className="font-heading my-12 text-center text-3xl">{`${remaining.join(
      " : "
    )}`}</p>
  );
}
