
import { tavily } from "@tavily/core";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

export const searchWebTool = tool(
    async ({ query }) => {
        try {
            const result = await tvly.search(query);
            return JSON.stringify(result);
        } catch (error) {
            console.error("Tavily search failed:", error);
            return "Web search failed. Try again or answer using available information.";
        }
    },
    {
        name: "search_web",
        description:
            "Search the web for current information. Use for recent events, changing facts, and research requiring external sources.",
        schema: z.object({
            query: z.string().trim().min(1).max(500),
        }),
    }
);
