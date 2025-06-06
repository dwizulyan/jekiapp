import type { MouseEventHandler, ReactNode } from "react"
import type { LucideIcon } from "lucide-react";

export type ITypography = {
    children?: ReactNode;
    className?: string;
}

export type ILinkItem = {
    url: string,
    children: ReactNode,
    Icon?: LucideIcon;
    className?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}
