import { useEffect, useState } from "react";

export function Timer({
  countdown,
  onCountdown,
}: {
  countdown: number;
  onCountdown: (a: [number, number, number, number]) => void;
}) {
  const [remaining, setRemaining] = useState([0, 0, 0, 0]);

  const isWarningTime = () => {
    return remaining[0] === 0 && remaining[1] === 0;
  };

  useEffect(() => {
    let countDown = countdown;
    let i: any = null;
    i = setInterval(
      (function exec() {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (countDown % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        setRemaining([days, hours, minutes, seconds]);
        onCountdown([days, hours, minutes, seconds]);

        if (countDown >= 1000) {
          countDown -= 1000;
        } else {
          clearInterval(i);
        }

        return exec;
      })(),
      1000
    );

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <p
      className={`text-center text-3xl ${
        isWarningTime() ? "text-red-500" : ""
      }`}
    >{`${remaining[0]}d:${remaining[1]}h:${remaining[2]}m:${remaining[3]}s`}</p>
  );
}
