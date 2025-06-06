import type { ReactNode } from "react";

export type ILinkContainer = {
    children: ReactNode;
}
export type IMenuLink = {
    state: boolean;
    onClick: () => void;
}
