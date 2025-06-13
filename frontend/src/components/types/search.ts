import type { IImage } from "./image"

export type IDisplaySearch = {
    images: IImage[],
    dataLength: number,
    hasMore: boolean,
    next: () => void,
}