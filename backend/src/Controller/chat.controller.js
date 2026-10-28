import { generateTitle, generateResponse  } from "../services/ai.service.js"
import chatModel from "../model/chat.model.js"
import messageModel from "../model/message.model.js"


export const sendMessage = async (req, res) => {
    try {
        const { message, chat: chatId } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Message is required.",
            });
        }

        let chat;

        if (chatId) {
            chat = await chatModel.findOne({
                _id: chatId,
                user: req.user.id,
            });

            if (!chat) {
                return res.status(404).json({
                    message: "Chat not found.",
                });
            }
        } else {
            const title = await generateTitle(message);

            chat = await chatModel.create({
                user: req.user.id,
                title,
            });
        }

        await messageModel.create({
            chat: chat._id,
            content: message.trim(),
            role: "user",
        });

        const messages = await messageModel
            .find({ chat: chat._id })
            .sort({ createdAt: 1 })
            .lean();

        const aiMessage = await generateResponse(messages);

        const aiResponse = await messageModel.create({
            chat: chat._id,
            content: aiMessage,
            role: "ai",
        });

        return res.status(201).json({
            chat,
            userMessage: messages[messages.length - 1],
            aiResponse,
        });
    } catch (error) {
        console.error("Send message error:", error);

        return res.status(500).json({
            message: "Failed to send message.",
        });
    }
};



export const fetchChats = async (req, res) => {
    try {
        const chats = await chatModel
            .find({ user: req.user.id })
            .sort({ updatedAt: -1, createdAt: -1 });

        return res.status(200).json({
            message: "Chats fetched successfully.",
            chats,
        });
    } catch (error) {
        console.error("Fetch chats error:", error);

        return res.status(500).json({
            message: "Failed to fetch chats.",
        });
    }
};


export const fetchMessage = async (req, res) => {
    try {
        const { chatId } = req.params;

        const chat = await chatModel.findOne({
            _id: chatId,
            user: req.user.id,
        });

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found.",
            });
        }

        const messages = await messageModel
            .find({ chat: chat._id })
            .sort({ createdAt: 1 });

        return res.status(200).json({
            message: "Messages fetched successfully.",
            messages,
        });
    } catch (error) {
        console.error("Fetch messages error:", error);

        return res.status(500).json({
            message: "Failed to fetch messages.",
        });
    }
};


export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;

        const chat = await chatModel.findOneAndDelete({
            _id: chatId,
            user: req.user.id,
        });

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found.",
            });
        }

        await messageModel.deleteMany({
            chat: chat._id,
        });

        return res.status(200).json({
            message: "Chat deleted successfully.",
        });
    } catch (error) {
        console.error("Delete chat error:", error);

        return res.status(500).json({
            message: "Failed to delete chat.",
        });
    }
};