import { useState } from "react";
import { Button } from "../Button";
import { FormInput } from "./FormInput";

export function SubmissionForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [sourceLink, setSourceLink] = useState("");
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
        <FormInput
          onEdit={(s) => setSourceLink(s)}
          labelName="Source Code Link: "
          placeholder="Link to your project's source code (GitHub, GitLab etc)"
        />
      </div>
      <Button
        onClick={() => {
          console.log({
            name,
            techStack,
            description,
            videoLink,
            sourceLink,
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
