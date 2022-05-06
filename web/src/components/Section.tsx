import { ReactElement } from "react";

interface SectionProps {
  children: ReactElement | ReactElement[] | string;
  heading: string;
  className?: string;
}

export function Section({ className, children, heading }: SectionProps) {
  return (
    <section className={className}>
      <h2 className="font-heading text-xl mb-2">{heading}</h2>
      <div>{children}</div>
    </section>
  );
}
