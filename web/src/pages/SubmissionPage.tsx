import { Button } from "../components/Button";
import { SubmissionSupport } from "../components/SubmissionSupport";
import { Timer } from "../components/Timer";

export function SubmissionPage() {
  return (
    <main>
      <h1>Participant Dashboard</h1>
      <Timer />

      <SubmissionForm />

      <SubmissionSupport />
    </main>
  );
}

function SubmissionForm() {
  return (
    <form>
      <h2>project ready ? submit</h2>
      <FormInput />
      <FormInput />
      <FormInput />
      <FormInput />
      <Button>Submit Project</Button>
    </form>
  );
}

function FormInput() {
  return (
    <>
      <label>Name</label>
      <input placeholder="enter name" />
    </>
  );
}
