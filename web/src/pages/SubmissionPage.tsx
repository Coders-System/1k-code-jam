import { useState } from "react";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SubmissionSupport } from "../components/SubmissionSupport";
import { Timer } from "../components/Timer";

export function SubmissionPage() {
  const [isProjectSubmitted, setIsProjectSubmitted] = useState(false);
  const [remaining, setRemaining] = useState([0, 0, 0, 0, 0]);

  const isTimeOver = () => {
    return (
      remaining.reduce((p, c) => {
        return (p += c);
      }) == 0
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="w-full px-6 lg:px-48 mb-auto">
        <h1 className="font-heading text-xl text-center">
          Participant Dashboard
        </h1>

        <Timer onCountdown={(r) => setRemaining(r)} countdown={5000} />

        {!isProjectSubmitted && isTimeOver() ? (
          <Timeover />
        ) : !isProjectSubmitted ? (
          <SubmissionForm onSubmit={() => setIsProjectSubmitted(true)} />
        ) : (
          <Thanks />
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
    <form className="mb-8">
      <h2 className="font-semibold text-lg mb-3">
        Project Ready ? <span className="font-bold">Submit Now</span>
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
        className="mt-3 w-full"
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
    <div className="flex flex-col  text-sm">
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
