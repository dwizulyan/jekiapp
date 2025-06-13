import type { Context } from "hono";
import { Hono } from "hono";
import { ImageModel } from "@/services/image.service.js";

const imagesController = new Hono();
const image = new ImageModel();

imagesController.get("/get-by-tags", async (c: Context) => {
    try {
        const { tags, limit = 10, offset } = c.req.query();
        const getImages = await image.getByTags(tags, Number(limit), Number(offset))
        console.log(limit)
        console.log(offset)
        console.log(tags)
        return c.json({
            success: true,
            message: "Found Images with tags " + tags,
            dataLength: getImages.length,
            data: getImages
        })
    } catch (err) {
        return c.json({
            success: false,
            message: err instanceof Error ? err.message : "Unknown Error",
            data: []
        })
    }
})

export default imagesController;