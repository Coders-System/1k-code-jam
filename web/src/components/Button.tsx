import { ReactElement } from "react";

interface ButtonProps {
  children: ReactElement | ReactElement[] | string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ className, href, onClick, children }: ButtonProps) {
  const _className = `
  block
  bg-orange
  rounded-md
  text-white
  px-4
  py-2
  ${className}`;

  if (href) {
    return (
      <a className={_className} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={_className} onClick={onClick}>
        {children}
      </button>
    );
  }
}
