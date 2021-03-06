import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SubmissionForm } from "../components/submission/SubmissionForm";
import { SubmissionSupport } from "../components/submission/SubmissionSupport";
import { Thanks } from "../components/submission/Thanks";
import { Timeover } from "../components/submission/Timeover";
import { Timer } from "../components/Timer";
import { authContext } from "../http/auth";
import { getTimeUntilSubmission } from "../http/time";

export function SubmissionPage() {
  const user = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [isProjectSubmitted, _setIsProjectSubmitted] = useState(
    user?.submitted || false
  );
  const [remaining, setRemaining] = useState([0, 0, 0, 0, 0]);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    getTimeUntilSubmission().then((e) => {
      setCountdown(e);
      _setIsProjectSubmitted(user?.submitted || false);

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    _setIsProjectSubmitted(user?.submitted || false);
  }, [user]);

  const isTimeOver = () => {
    return (
      remaining.reduce((p, c) => {
        return (p += c);
      }) === 0
    );
  };

  if (user === null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="w-full container mx-auto mb-auto mt-8">
        <h2 className="font-heading text-5xl mb-4 text-center">
          Participant Dashboard
        </h2>
        <h3 className="text-2xl text-center my-8">
          Welcome, {user?.username}#{user?.discriminator}
        </h3>
        {loading ? (
          <></>
        ) : (
          <>
            {countdown && !isProjectSubmitted && (
              <div className="my-4">
                <h1 className="text-center text-lg mb-2 font-semibold">
                  Time Remaining
                </h1>
                <Timer
                  onCountdown={(r) => setRemaining(r)}
                  countdown={countdown}
                />
              </div>
            )}

            {!loading && !isProjectSubmitted && isTimeOver() ? (
              <Timeover />
            ) : !isProjectSubmitted ? (
              <>
                <p>{isProjectSubmitted}</p>
                <SubmissionForm
                  onSubmit={() => {
                    _setIsProjectSubmitted(true);
                  }}
                />
              </>
            ) : (
              <Thanks />
            )}
          </>
        )}

        <SubmissionSupport />
      </main>
      <Footer />
    </div>
  );
}
