import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { IImage } from "@/types/images.type.js";
import { handleError } from "@/errors/HandleError.js";
import { BadRequestError } from "@/errors/BadRequestError.js";

export class ImageModel {
    private prisma = new PrismaClient();
    private url = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=2000"
    async getByTags(tags: string, limit: number = 10, offset: number) {
        try {
            if (offset === undefined) {
                throw new BadRequestError("No offset provided");
            }
            const urlWithTag = `${this.url}&tags=${tags}`;
            const getImages = await fetch(urlWithTag);
            if (!getImages.ok) {
                throw new Error("Error While fetching");
            }
            const text = await getImages.text();
            if (!text) {
                throw new NotFoundError("No Images with tags " + tags)
            }
            const result: IImage[] = JSON.parse(text);
            if (!result) {
                throw new Error("Error While parsing data")
            }
            console.log(result.slice(1, 10))
            return result.slice(offset, limit + offset)
        } catch (err) {
            handleError(err);
        }
    }
}