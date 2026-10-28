import { Router } from "express";
import { deleteChat, fetchChats, fetchMessage, sendMessage } from "../Controller/chat.controller.js";
import { authUser } from "../middleware/authUser.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser , sendMessage)

chatRouter.get("/" , authUser , fetchChats)

chatRouter.get("/:chatId/messages", authUser , fetchMessage)

chatRouter.delete("/chat/:chatId" , authUser, deleteChat)



export default chatRouter;