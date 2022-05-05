import {ReactElement} from "react";

interface SectionProps {
  children: ReactElement | ReactElement[] | string;
  heading: string;
}

export function Section({children,heading}: SectionProps) {
  return (
    <section>
    <h2>{heading}</h2>
      <div>
        {children}
      </div>
    </section>
  );
}
