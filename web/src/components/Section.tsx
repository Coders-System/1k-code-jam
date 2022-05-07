import { ReactElement } from "react";

interface SectionProps {
  children: ReactElement | ReactElement[] | string;
  heading: string;
  className?: string;
}

export function Section({ className, children, heading }: SectionProps) {
  return (
    <section className={className}>
      <h2 className="font-heading text-5xl mb-4">{heading}</h2>
      <div>{children}</div>
    </section>
  );
}
