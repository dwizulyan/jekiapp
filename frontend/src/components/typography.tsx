import { cn } from "@/lib/utils";
import type { ITypography, ILinkItem } from "./types/typography";
import type { FC } from "react";
import { Link } from "react-router-dom";

export const H1: FC<ITypography> = ({ className, children }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const H2: FC<ITypography> = ({ className, children }) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
};

export const H3: FC<ITypography> = ({ className, children }) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const H4: FC<ITypography> = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const P: FC<ITypography> = ({ className, children }) => {
  return (
    <h4 className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </h4>
  );
};
export const Blockquote: FC<ITypography> = ({ className, children }) => {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
};
export const Inlinecode: FC<ITypography> = ({ className, children }) => {
  return (
    <blockquote
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </blockquote>
  );
};
export const Lead: FC<ITypography> = ({ className, children }) => {
  return (
    <blockquote className={cn("text-muted-foreground text-xl", className)}>
      {children}
    </blockquote>
  );
};
export const Large: FC<ITypography> = ({ className, children }) => {
  return (
    <blockquote className={cn("text-lg font-semibold", className)}>
      {children}
    </blockquote>
  );
};
export const Small: FC<ITypography> = ({ className, children }) => {
  return (
    <blockquote className={cn("text-lg font-semibold", className)}>
      {children}
    </blockquote>
  );
};
export const Muted: FC<ITypography> = ({ className, children }) => {
  return (
    <blockquote className={cn("text-muted-foreground text-sm", className)}>
      {children}
    </blockquote>
  );
};
export const LinkItem: React.FC<ILinkItem> = ({
  className,
  url,
  children,
  onClick = undefined,
  Icon,
}) => {
  const linkClass =
    "font-medium text-foreground flex gap-2 items-center py-2 rounded px-1";
  return (
    <Link onClick={onClick} className={cn(linkClass, className)} to={url}>
      {Icon ? <Icon size={18} /> : ""}
      {children}
    </Link>
  );
};
