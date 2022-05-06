import { Button } from "../components/Button";

export function SubmissionSupport() {
  return (
    <div className="my-3 flex flex-row lg:flex-col items-center gap-6">
      <p className="text-center font-bold">Having issues ?</p>
      <Button className="h-min grow">Contact support</Button>
    </div>
  );
}
