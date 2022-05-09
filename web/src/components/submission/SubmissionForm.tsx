import { useState } from "react";
import { Button } from "../Button";
import { WithContext as ReactTags, Tag } from "react-tag-input";
import { Formik } from "formik";
import { FormInput } from "./FormInput";
import { submitProject } from "../../http/submit";
import { suggestions } from "../../tags";

export function SubmissionForm({ onSubmit }: { onSubmit: () => void }) {
  const [techStack, setTechStack] = useState<Tag[]>([]);
  const [tagError, setTagError] = useState<{
    text: string;
    disable: boolean;
  } | null>(null);

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

    if (tag.text.includes(",")) {
      setTagError({
        text: "Tag can not contain `,`",
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

  const handleTagClick = (index: number) => {};

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        videoLink: "",
        sourceLink: "",
      }}
      validate={(values) => {
        const errors: any = {};
        if (tagError) {
          errors.tagError = tagError;
        }
        if (techStack.length <= 0) {
          setTagError({
            text: "At least one tech stack tag required.",
            disable: false,
          });
          errors.tagError = "At least one tech stack tag required.";
        }
        if (values.name.length < 3) {
          errors.name = "Name should be more than 3 characters.";
        }
        if (values.name.length > 60) {
          errors.name = "Name should be less than 60 characters.";
        }
        if (values.description.length < 100) {
          errors.description = "Description should be at least 100 characters";
        }
        if (values.description.length > 2000) {
          errors.description =
            "Description should be less than 2000 characters";
        }

        const urlRegex = new RegExp(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        );

        if (!values.sourceLink.match(urlRegex)) {
          errors.sourceLink = "Must be a link";
        }
        if (!values.videoLink.match(urlRegex)) {
          errors.videoLink = "Must be a link";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const { name, description, sourceLink, videoLink } = values;

        await submitProject({
          project_name: name,
          description: description,
          tech_stack: techStack.map((t) => t.text),
          video_link: videoLink,
          code_link: sourceLink,
        });
        setSubmitting(false);
        onSubmit();
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => {
        return (
          <form
            onSubmit={handleSubmit}
            className="my-8 w-full xl:w-8/12 mx-auto"
          >
            <h2 className="font-semibold text-lg my-5">
              Is your project ready?{" "}
              <span className="font-bold">Submit Now</span>
            </h2>
            <div className="flex flex-col gap-3">
              <FormInput
                onChange={handleChange}
                error={errors.name && touched.name && errors.name}
                name="name"
                value={values.name}
                labelName="Project Name:"
                placeholder="Enter your project's name"
              />

              <div className="flex flex-col gap-1 text-sm">
                <label className="">Tech Stack:</label>
                <ReactTags
                  handleAddition={handleAddition}
                  handleDelete={handleDelete}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  tags={techStack}
                  suggestions={suggestions}
                  classNames={{
                    tagInputField:
                      "mt-2 placeholder:text-xs w-full text-gray-800",
                    tagInput: "w-full",
                    suggestions: "text-black bg-white px-2",
                    activeSuggestion: "text-black bg-gray-300 cursor-pointer",
                  }}
                />
                <p className="text-red-500">{tagError?.text}</p>
              </div>

              <FormInput
                onChange={handleChange}
                name="description"
                error={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
                value={values.description}
                labelName="Description: "
                placeholder="Enter your project's description"
                isTextArea={true}
              />
              <FormInput
                onChange={handleChange}
                error={
                  errors.videoLink && touched.videoLink && errors.videoLink
                }
                value={values.videoLink}
                name="videoLink"
                labelName="Video Link: "
                placeholder="Link to your project showcase video"
              />
              <FormInput
                onChange={handleChange}
                value={values.sourceLink}
                error={
                  errors.sourceLink && touched.sourceLink && errors.sourceLink
                }
                name="sourceLink"
                labelName="Source Code Link: "
                placeholder="Link to your project's source code (GitHub, GitLab etc)"
              />
            </div>
            <Button type="submit" className="mt-6 w-full">
              Submit Project
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}
