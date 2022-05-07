import { useEffect, useState } from "react";

export function Timer({
  countdown,
  onCountdown,
}: {
  countdown: number;
  onCountdown: (a: [number, number, number, number]) => void;
}) {
  const [remaining, setRemaining] = useState([0, 0, 0, 0]);

  useEffect(() => {
    let countDown = countdown;
    const i = setInterval(() => {
      // calculate time left
      const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

      setRemaining([days, hours, minutes, seconds]);
      onCountdown([days, hours, minutes, seconds]);

      if (countDown >= 1000) {
        countDown -= 1000;
      } else {
        clearInterval(i);
      }
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <p
      className={`font-heading my-12 text-center text-3xl ${
        remaining[0] == 0 && remaining[1] == 0 ? "text-red-500" : ""
      }`}
    >{`${remaining.join(" : ")}`}</p>
  );
}
