import { useState } from "react";
import { Button } from "../Button";
import { FormInput } from "./FormInput";
import { WithContext as ReactTags, Tag } from "react-tag-input";
//import {suggestions} from "../../tags";

export function SubmissionForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [techStack, setTechStack] = useState<Tag[]>([]);
  const [tagError, setTagError] = useState<{
    text: string;
    disable: boolean;
  } | null>(null);
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [sourceLink, setSourceLink] = useState("");

  const handleDelete = (i: number) => {
    if (techStack.length <= 10) {
      setTagError(null);
    }
    setTechStack(techStack.filter((_tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    if (techStack.length >= 10) {
      setTagError({ text: "Only 10 tags are supported.", disable: true });
      return;
    }
    if (tag.text.length > 20) {
      setTagError({
        text: "Tag can not be more than 20 characters long",
        disable: false,
      });
      return;
    }

    setTagError(null);
    setTechStack([...techStack, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = techStack.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTechStack(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

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

        <div className="flex flex-col gap-2 text-sm">
          <label className="">Tech Stack:</label>
          <ReactTags
            handleAddition={handleAddition}
            handleDelete={handleDelete}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            tags={techStack}
          />
          <p className="text-red-500">{tagError?.text}</p>
        </div>

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
            techStack: techStack.map((t) => t.text),
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
