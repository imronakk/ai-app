import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

// GET

export const GET = async (req, { params }) => {
    try {
        await connectToDb();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt Not Found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all posts", { status: 500 });
    }
}

// PATCH
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()

    try {
        await connectToDb();
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response("Prompt Not Found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update posts", { status: 500 });
    }
}

// DELETE
export const DELETE = async (req, { params }) => {
    try {
        await connectToDb();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt Deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete posts", { status: 500 });
    }
}