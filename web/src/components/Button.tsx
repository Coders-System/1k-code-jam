import { ReactElement } from "react";

interface ButtonProps {
  children: ReactElement | ReactElement[] | string;
  href?: string;
  onClick?: () => void;
}

export function Button({ href, onClick, children }: ButtonProps) {
  const _className = "";

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
