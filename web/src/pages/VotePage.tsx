import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

import { WithContext as ReactTags, Tag } from "react-tag-input";
import { SubmissionForm } from "../components/submission/SubmissionForm";
import { SubmissionSupport } from "../components/submission/SubmissionSupport";
import { Thanks } from "../components/submission/Thanks";
import { Timeover } from "../components/submission/Timeover";
import { Timer } from "../components/Timer";
import { authContext } from "../http/auth";
import { getTimeUntilSubmission, getTimeUntilVoteEnd } from "../http/time";
import { Submission } from "../http/types";
import { getSubmissions, voteSubmission } from "../http/vote";

export function VotePage() {
  const user = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [votableSubmissions, setVotableSubmissions] = useState<Submission[]>(
    []
  );

  const [isVotingStarted, setIsVotingStarted] = useState(false);
  const [remaining, setRemaining] = useState([0, 0, 0, 0, 0]);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    getTimeUntilVoteEnd().then(({ remainingTime, isVotingStarted }) => {
      setIsVotingStarted(isVotingStarted);
      setCountdown(remainingTime);
    });
  }, [user]);
  useEffect(() => {
    if (!isVotingStarted) {
      return;
    }
    getSubmissions().then((ss) => {
      setVotableSubmissions(ss.submissions);
      setLoading(false);
    });
  }, [user, isVotingStarted]);

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

        {isVotingStarted ? (
          <>
            {user?.voted ? (
              <>Check discord annoucement to see the winners later.</>
            ) : (
              <>
                <p>Vote for any submission. Rem: You can only vote once.</p>

                {votableSubmissions.map((s) => {
                  return (
                    <div>
                      <p>{s.project_name}</p>
                      <Button className="w-fit" href={s.code_link}>
                        Code link
                      </Button>
                      <Button className="w-fit" href={s.video_link}>
                        Video link
                      </Button>

                      <p>Tech stack:</p>

                      <ReactTags
                        tags={s.tech_stack.map((t) => {
                          return { id: t, text: t };
                        })}
                        handleDelete={() => {}}
                        handleAddition={() => {}}
                        classNames={{
                          tagInputField:
                            "mt-2 placeholder:text-xs w-full text-gray-800",
                          tagInput: "w-full",
                          suggestions: "text-black bg-white px-2",
                          activeSuggestion:
                            "text-black bg-gray-300 cursor-pointer",
                        }}
                        readOnly={true}
                      />

                      <Button
                        type="button"
                        onClick={() => {
                          voteSubmission(s.project_name);
                        }}
                      >
                        Vote!
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <p> voting not yet started. wait till submission ends.</p>
        )}

        <SubmissionSupport />
      </main>
      <Footer />
    </div>
  );
}
