import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import {
    SystemMessage,
    HumanMessage,
    AIMessage,
} from "@langchain/core/messages";
import { createAgent } from "langchain";
import { searchWebTool } from "./webSearch.service.js";

const geminiModel = new ChatGoogle({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    model: "gemini-3.5-flash-lite",
    temperature: 0.7,
});

const mistralModel = new ChatMistralAI({
    model: "ministral-3b-latest",
    apiKey: process.env.MISTRAL_API_KEY,
    temperature: 0.3,
});







const RESPONSE_SYSTEM_PROMPT = `
You are Knowvia AI, a helpful, intelligent, natural AI assistant.

## Core principles
- Answer the user's actual question directly.
- Prioritize accuracy, clarity, and usefulness over length.
- Adapt your response to the user's intent and level of knowledge.
- Sound natural and conversational, not like a textbook.
- Use conversation history to understand follow-up questions.

## Response length
- Simple question: answer in 1-3 sentences when sufficient.
- Practical question: provide actionable steps.
- Technical explanation: explain concepts and include examples when useful.
- Complex engineering question: provide a structured, detailed explanation.
- Code review: identify important issues first; do not rewrite everything unnecessarily.
- Casual conversation: respond naturally without forcing headings or lists.

## Formatting
- Return standard Markdown.
- Use headings only when they improve readability.
- Keep paragraphs short and separate distinct ideas with blank lines.
- Use **bold** to emphasize important concepts.
- Use relevant emojis sparingly, mainly for meaningful section headings.
- Use lists for related items and numbered steps for sequential instructions.
- Use tables only when comparison benefits from them.
- Format code using fenced code blocks with language identifiers.
- Avoid excessive headings, repetitive conclusions, and decorative separators.
- Never repeat the same point across multiple sections.
- Do not force every answer into a tutorial or article format.

## Technical accuracy
- Provide correct, practical code.
- Explain important trade-offs and security risks when relevant.
- Distinguish confirmed facts from assumptions.
- Never invent APIs, test results, or completed actions.
- Ask a clarifying question only when necessary.

Finish naturally once the user's question is answered.
`;


const TITLE_SYSTEM_PROMPT = `
Generate a concise, meaningful title for a conversation based on the user's first message.

Rules:
- Use 2–6 words when possible, with an absolute maximum of 8 words.
- Capture the main topic or goal, not incidental details.
- Use natural title case.
- Return only the title.
- Do not use quotation marks, emojis, labels, or ending punctuation.
- Avoid generic titles such as "General Question" or "New Conversation".
`;



const agent = createAgent({
    model: geminiModel,
    tools: [searchWebTool],
    systemPrompt: RESPONSE_SYSTEM_PROMPT,
});


const extractText = (content) => {
    if (typeof content === "string") {
        return content.trim();
    }

    if (Array.isArray(content)) {
        return content
            .map((part) => {
                if (typeof part === "string") {
                    return part;
                }

                if (part?.type === "text" && typeof part.text === "string") {
                    return part.text;
                }

                return "";
            })
            .filter(Boolean)
            .join("\n")
            .trim();
    }

    return "";
};


export const generateResponse = async (messages) => {
    if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error("Messages must be a non-empty array.");
    }

    const formattedMessages = messages
        .filter(
            (msg) =>
                typeof msg?.content === "string" &&
                msg.content.trim() &&
                ["user", "ai", "assistant"].includes(msg.role)
        )
        .map((msg) => {
            const content = msg.content.trim();

            if (msg.role === "user") {
                return new HumanMessage(content);
            }

            return new AIMessage(content);
        });

    if (formattedMessages.length === 0) {
        throw new Error("No valid conversation messages found.");
    }

    const response = await agent.invoke({
        messages: formattedMessages,
    });

    const finalMessage = [...(response.messages ?? [])]
        .reverse()
        .find(
            (msg) =>
                msg?._getType?.() === "ai" &&
                (!msg.tool_calls || msg.tool_calls.length === 0)
        );

    const content = finalMessage
        ? extractText(finalMessage.content)
        : "";

    if (!content) {
        throw new Error("The AI returned an empty response.");
    }

    return content;
};


export const generateTitle = async (message) => {
    if (typeof message !== "string" || !message.trim()) {
        throw new Error("A valid message is required to generate a title.");
    }

    const response = await mistralModel.invoke([
        new SystemMessage(TITLE_SYSTEM_PROMPT),
        new HumanMessage(message.trim()),
    ]);

    const title = extractText(response.content)
        .replace(/^["'`]+|["'`]+$/g, "")
        .replace(/\s+/g, " ")
        .replace(/[.!?]+$/, "")
        .trim();

    if (!title) {
        throw new Error("The AI returned an empty conversation title.");
    }

    return title.split(/\s+/).slice(0, 8).join(" ");
};
