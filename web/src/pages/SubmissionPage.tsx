import { useState } from "react";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SubmissionSupport } from "../components/SubmissionSupport";
import { Timer } from "../components/Timer";

export function SubmissionPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="w-full px-6 lg:px-48 mb-auto">
        <h1 className="font-heading text-xl text-center">
          Participant Dashboard
        </h1>
        <Timer />

        <SubmissionForm />

        <SubmissionSupport />
      </main>
      <Footer />
    </div>
  );
}

function SubmissionForm() {
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
