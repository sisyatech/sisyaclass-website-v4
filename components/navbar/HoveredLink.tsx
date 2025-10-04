import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface HoveredLinkProps extends LinkProps {
  children: ReactNode;
}

export const HoveredLink = ({ children, ...rest }: HoveredLinkProps) => {
  return (
    <Link {...rest} className="text-neutral-700 hover:text-black dark:text-neutral-200">
      {children}
    </Link>
  );
};
