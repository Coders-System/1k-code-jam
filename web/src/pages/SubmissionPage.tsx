import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SubmissionSupport } from "../components/SubmissionSupport";
import { Timer } from "../components/Timer";
import { authContext } from "../http/auth";
import { getTimeUntilSubmission } from "../http/time";

export function SubmissionPage() {
  const user = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [isProjectSubmitted, setIsProjectSubmitted] = useState(
    user?.submitted || false
  );
  const [remaining, setRemaining] = useState([0, 0, 0, 0, 0]);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    getTimeUntilSubmission().then((e) => {
      console.log(e);
      setCountdown(e);
      setLoading(false);
    });
  }, []);

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
            {countdown && (
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
              <SubmissionForm onSubmit={() => setIsProjectSubmitted(true)} />
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

function Thanks() {
  return (
    <p className="text-center mb-8">
      Thank you for participating in our code jam!
    </p>
  );
}
function Timeover() {
  return (
    <p className="text-center mb-8">
      Time has run out. If you have something to say, contact support
    </p>
  );
}

function SubmissionForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  return (
    <form className="my-8 w-full xl:w-8/12 mx-auto">
      <h2 className="font-semibold text-lg my-5">
        Is your project ready? <span className="font-bold">Submit Now</span>
      </h2>
      <div className="flex flex-col gap-3">
        <FormInput
          onEdit={(s) => setName(s)}
          labelName="Project Name:"
          placeholder="Enter your project's name"
        />
        <FormInput
          onEdit={(s) => setTechStack(s)}
          labelName="Tech stack:"
          placeholder="Enter the technologies used in your project"
        />
        <FormInput
          onEdit={(s) => setDescription(s)}
          labelName="Description: "
          placeholder="Enter your project's description"
          isTextArea={true}
        />
        <FormInput
          onEdit={(s) => setVideoLink(s)}
          labelName="Video Link: "
          placeholder="Link to your project showcase video"
        />
      </div>
      <Button
        onClick={() => {
          console.log({
            name,
            techStack,
            description,
            videoLink,
          });
          onSubmit();
        }}
        className="mt-6 w-full"
      >
        Submit Project
      </Button>
    </form>
  );
}

interface FormInputProps {
  labelName: string;
  placeholder: string;
  onEdit: (text: string) => void;
  isTextArea?: boolean;
}
function FormInput({
  labelName,
  placeholder,
  onEdit,
  isTextArea = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label className="">{labelName}</label>

      {isTextArea ? (
        <textarea
          className="text-gray-800 placeholder:text-xs"
          onChange={(e) => onEdit(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="text-gray-800 placeholder:text-xs"
          onChange={(e) => onEdit(e.target.value)}
          type="text"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
