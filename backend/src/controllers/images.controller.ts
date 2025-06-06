import { handleError } from "@/errors/HandleError.js";
import type { IImage } from "@/types/images.type.js";
import type { Context } from "hono";
import { Hono } from "hono";

const imagesController = new Hono();
const url = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=2000"

imagesController.get("/get-by-tags", async (c: Context) => {
    try {
        const { tags } = c.req.query();
        const urlWithTag = `${url}&tags=${tags}`;
        const getImages = await fetch(urlWithTag);
        if (!getImages.ok) {
            throw new Error("Error While fetching");
        }
        const text = await getImages.text();
        console.log(text)
        if (!text) {
            return c.json({
                success: false,
                message: "No image found with that tag.",
                data: []
            });
        }
        const result: IImage[] = JSON.parse(text);
        if (!result) {
            return c.json({
                success: true,
                message: `no images`,
            })
        }
        return c.json({
            success: true,
            message: `There are ${result.length} images fetched`,
            data: result
        })
    } catch (err) {
        handleError(err);
    }
})

export default imagesController;